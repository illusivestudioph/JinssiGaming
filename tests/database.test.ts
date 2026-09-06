// @vitest-environment node
import { readFileSync } from 'node:fs';
import { PGlite } from '@electric-sql/pglite';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { games } from '../src/data/games';

// PGlite is real PostgreSQL in WASM. Only Supabase-managed auth/storage scaffolding
// is stubbed; the application migrations, constraints, triggers and RLS run as-is.
const admin = '11111111-1111-4111-8111-111111111111';
const member = '22222222-2222-4222-8222-222222222222';
const other = '33333333-3333-4333-8333-333333333333';
let db: PGlite;

beforeAll(async () => {
  db = new PGlite();
  await db.exec(`
    create role anon nologin;
    create role authenticated nologin;
    create schema auth;
    create table auth.users (id uuid primary key, raw_user_meta_data jsonb default '{}'::jsonb);
    create function auth.uid() returns uuid language sql stable as $$
      select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid;
    $$;
    grant usage on schema auth to anon, authenticated;
    create schema storage;
    create table storage.buckets (id text primary key, name text, public boolean, file_size_limit bigint, allowed_mime_types text[]);
    create table storage.objects (id uuid primary key default gen_random_uuid(), bucket_id text references storage.buckets(id), name text not null);
    alter table storage.objects enable row level security;
    grant usage on schema storage to anon, authenticated;
    grant select, insert, update, delete on storage.objects to anon, authenticated;
    create function storage.foldername(name text) returns text[] language sql immutable as $$
      select (string_to_array(name, '/'))[1:array_length(string_to_array(name, '/'), 1) - 1];
    $$;
  `);
  await db.exec(readFileSync('supabase/migrations/20260906000100_initial_schema.sql', 'utf8'));
  await db.exec(readFileSync('supabase/migrations/20260906000200_seed_content.sql', 'utf8'));
  await db.query(
    'insert into auth.users (id, raw_user_meta_data) values ($1, $2), ($3, $4), ($5, $6)',
    [
      admin,
      { display_name: 'Site Admin' },
      member,
      { display_name: 'Player One', role: 'admin' },
      other,
      { email: 'private@example.com' },
    ],
  );
  await db.query('insert into public.admin_users values ($1)', [admin]);
}, 30000);

beforeEach(async () => {
  await db.exec('begin');
});
afterEach(async () => {
  await db.exec('rollback');
});
afterAll(async () => {
  await db?.close();
});

async function asUser<T>(
  role: 'anon' | 'authenticated',
  userId: string | null,
  sql: string,
  params: unknown[] = [],
) {
  await db.exec(`savepoint actor; set local role ${role};`);
  await db.query("select set_config('request.jwt.claim.sub', $1, true)", [userId ?? '']);
  try {
    const result = await db.query<T>(sql, params);
    await db.exec('reset role; release savepoint actor;');
    return result.rows;
  } catch (error) {
    await db.exec('rollback to savepoint actor; release savepoint actor;');
    throw error;
  }
}
const note = (userId: string, text = 'Helpful note') =>
  asUser<{ id: string; user_id: string; user_name: string; text: string }>(
    'authenticated',
    userId,
    'insert into public.comments(game_id, text) values ($1, $2) returning *',
    ['librarian', text],
  );

describe('Supabase migrations and public access', () => {
  it('seeds valid content and allows public reads', async () => {
    const rows = await asUser('anon', null, 'select id from public.games');
    expect(rows).toHaveLength(5);
    expect(await asUser('anon', null, 'select id from public.site_settings')).toEqual([
      { id: true },
    ]);
    expect(await asUser('anon', null, 'select public.is_admin()')).toEqual([{ is_admin: false }]);
  });
  it('does not give anonymous visitors write or admin-membership access', async () => {
    await expect(
      asUser('anon', null, "update public.site_settings set hero_image = '/bad.jpeg'"),
    ).rejects.toThrow(/permission denied/);
    await expect(
      asUser('anon', null, "insert into public.comments(game_id,text) values ('librarian','bad')"),
    ).rejects.toThrow(/permission denied/);
    await expect(asUser('anon', null, 'select * from public.admin_users')).rejects.toThrow(
      /permission denied/,
    );
  });
  it('does not let editable user metadata become an admin role', async () => {
    expect(await asUser('authenticated', member, 'select public.is_admin()')).toEqual([
      { is_admin: false },
    ]);
    expect(await asUser('authenticated', admin, 'select public.is_admin()')).toEqual([
      { is_admin: true },
    ]);
    await expect(
      asUser('authenticated', member, 'insert into public.admin_users values ($1)', [member]),
    ).rejects.toThrow(/permission denied/);
  });
  it('denies ordinary members content writes even when they call the API directly', async () => {
    expect(
      await asUser(
        'authenticated',
        member,
        "update public.games set title = 'hacked' where id = 'librarian' returning id",
      ),
    ).toEqual([]);
    expect(await asUser('authenticated', member, 'delete from public.games returning id')).toEqual(
      [],
    );
    expect(
      await asUser(
        'authenticated',
        member,
        "update public.site_settings set logo_image = '/hacked.png' returning id",
      ),
    ).toEqual([]);
    await expect(
      asUser(
        'authenticated',
        member,
        "insert into public.games select 'hacked', title, developer, category, description, accent_color, cover_image, cover_alt, walkthrough, revision, updated_at from public.games limit 1",
      ),
    ).rejects.toThrow();
  });
  it('allows admin edits and increments server-managed revision numbers', async () => {
    const rows = await asUser(
      'authenticated',
      admin,
      "update public.games set title = 'Updated' where id = 'librarian' and revision = 1 returning title, revision",
    );
    expect(rows).toEqual([{ title: 'Updated', revision: 2 }]);
    expect(
      await asUser(
        'authenticated',
        admin,
        "update public.games set title = 'Stale overwrite' where id = 'librarian' and revision = 1 returning id",
      ),
    ).toEqual([]);
    await expect(
      asUser('authenticated', admin, "update public.games set revision = 1 where id = 'librarian'"),
    ).rejects.toThrow(/permission denied/);
    await expect(
      asUser(
        'authenticated',
        admin,
        "update public.games set id = 'new-id' where id = 'librarian'",
      ),
    ).rejects.toThrow(/permission denied/);
    expect(
      await asUser(
        'authenticated',
        admin,
        "update public.site_settings set logo_image = '/new-logo.jpeg' where id and revision = 1 returning revision",
      ),
    ).toEqual([{ revision: 2 }]);
  });
  it('blocks malformed walkthroughs and duplicate step keys in the database', async () => {
    await expect(
      asUser('authenticated', admin, 'update public.games set walkthrough = $1 where id = $2', [
        [{ title: 'Broken', steps: [{ text: 'Wrong model' }] }],
        'librarian',
      ]),
    ).rejects.toThrow(/check constraint/);
    const walkthrough = structuredClone(games[0].walkthrough);
    walkthrough[0].steps.push(walkthrough[0].steps[0]);
    await expect(
      asUser('authenticated', admin, 'update public.games set walkthrough = $1 where id = $2', [
        walkthrough,
        'librarian',
      ]),
    ).rejects.toThrow(/check constraint/);
  });
  it('rejects unsafe URLs and unconfigured payment wallets server-side', async () => {
    await expect(
      asUser(
        'authenticated',
        admin,
        "update public.site_settings set logo_image = 'javascript:alert(1)'",
      ),
    ).rejects.toThrow(/check constraint/);
    await expect(
      asUser('authenticated', admin, 'update public.site_settings set cta_links = $1', [
        [{ id: 'bad', label: 'Bad', url: 'javascript:alert(1)' }],
      ]),
    ).rejects.toThrow(/check constraint/);
    await expect(
      asUser('authenticated', admin, 'update public.site_settings set cta_links = $1', [
        [
          {
            id: 'bad',
            label: 'Bad',
            url: '#',
            wallets: [{ name: 'Wallet', accountName: 'Owner', accountNumber: '' }],
          },
        ],
      ]),
    ).rejects.toThrow(/check constraint/);
  });
  it('revokes privileges immediately when admin membership is removed', async () => {
    await db.query('delete from public.admin_users where user_id = $1', [admin]);
    expect(
      await asUser(
        'authenticated',
        admin,
        "update public.games set title = 'Revoked' returning id",
      ),
    ).toEqual([]);
    expect(await asUser('authenticated', admin, 'select public.is_admin()')).toEqual([
      { is_admin: false },
    ]);
  });
});

describe('community notes policies', () => {
  it('derives authorship from auth rather than trusting the client', async () => {
    const rows = await note(member, '  Helpful note  ');
    expect(rows[0]).toMatchObject({
      user_id: member,
      user_name: 'Player One',
      text: 'Helpful note',
      game_id: 'librarian',
    });
    expect(await asUser('anon', null, 'select text from public.comments')).toEqual([
      { text: 'Helpful note' },
    ]);
    await expect(
      asUser(
        'authenticated',
        member,
        "insert into public.comments(game_id,text,user_id,user_name) values ('librarian','spoof',$1,'Admin')",
        [admin],
      ),
    ).rejects.toThrow(/permission denied/);
  });
  it('never exposes an email as a fallback display name', async () => {
    expect((await note(other))[0].user_name).toBe('Cozy Gamer');
  });
  it('enforces posting cooldown and comment size constraints', async () => {
    await note(member);
    await expect(note(member, 'Another note')).rejects.toThrow(/15 seconds/);
    await expect(note(other, '   ')).rejects.toThrow(/check constraint/);
    await expect(note(other, '\n\t\r')).rejects.toThrow(/check constraint/);
    await expect(note(other, 'x'.repeat(2001))).rejects.toThrow(/check constraint/);
  });
  it('allows deletion only for the author or an admin', async () => {
    const [{ id }] = await note(member);
    expect(
      await asUser(
        'authenticated',
        other,
        'delete from public.comments where id = $1 returning id',
        [id],
      ),
    ).toEqual([]);
    expect(
      await asUser(
        'authenticated',
        member,
        'delete from public.comments where id = $1 returning id',
        [id],
      ),
    ).toEqual([{ id }]);
    const [{ id: secondId }] = await note(other);
    expect(
      await asUser(
        'authenticated',
        admin,
        'delete from public.comments where id = $1 returning id',
        [secondId],
      ),
    ).toEqual([{ id: secondId }]);
  });
  it('rejects orphaned notes and cascades a game deletion', async () => {
    await expect(
      asUser(
        'authenticated',
        member,
        "insert into public.comments(game_id,text) values ('not-a-game','Bad')",
      ),
    ).rejects.toThrow(/foreign key/);
    await note(member);
    await asUser('authenticated', admin, "delete from public.games where id = 'librarian'");
    expect(await db.query('select * from public.comments')).toMatchObject({ rows: [] });
  });
});

describe('public image bucket', () => {
  it('restricts uploads to admins using their own folder', async () => {
    await expect(
      asUser(
        'anon',
        null,
        "insert into storage.objects(bucket_id,name) values ('site-assets','anonymous/a.png')",
      ),
    ).rejects.toThrow(/row-level security/);
    await expect(
      asUser(
        'authenticated',
        member,
        "insert into storage.objects(bucket_id,name) values ('site-assets',$1)",
        [`${member}/a.png`],
      ),
    ).rejects.toThrow(/row-level security/);
    await expect(
      asUser(
        'authenticated',
        admin,
        "insert into storage.objects(bucket_id,name) values ('site-assets',$1)",
        [`${member}/a.png`],
      ),
    ).rejects.toThrow(/row-level security/);
    const rows = await asUser(
      'authenticated',
      admin,
      "insert into storage.objects(bucket_id,name) values ('site-assets',$1) returning name",
      [`${admin}/a.png`],
    );
    expect(rows).toEqual([{ name: `${admin}/a.png` }]);
    expect(await asUser('anon', null, 'select name from storage.objects')).toEqual(rows);
    expect(
      await asUser(
        'authenticated',
        admin,
        "update storage.objects set name = 'overwrite.png' returning name",
      ),
    ).toEqual([]);
    expect(
      await asUser('authenticated', member, 'delete from storage.objects returning name'),
    ).toEqual([]);
    expect(
      await asUser('authenticated', admin, 'delete from storage.objects returning name'),
    ).toEqual(rows);
  });
  it('sets a size and raster MIME allowlist on the bucket', async () => {
    const { rows } = await db.query<{ file_size_limit: number; allowed_mime_types: string[] }>(
      "select file_size_limit, allowed_mime_types from storage.buckets where id = 'site-assets'",
    );
    expect(Number(rows[0].file_size_limit)).toBe(5 * 1024 * 1024);
    expect(rows[0].allowed_mime_types).not.toContain('image/svg+xml');
  });
});
