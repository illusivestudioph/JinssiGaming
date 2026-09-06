# Jinssi Gaming

A React + TypeScript + Vite site for cozy game walkthroughs. Supabase provides authentication, shared site content, community notes, and image storage.

## Run locally

Requires **Node.js 22.12+** (`.nvmrc` selects Node 22).

```sh
npm ci
cp .env.example .env.local
npm run dev
```

With both Supabase values empty, the site runs in **read-only preview mode**. The bundled guides and valid legacy browser content are readable; checkboxes still save progress on the current device. Admin publishing and community notes require Supabase. There is no hardcoded password or local admin bypass.

Vite listens on `0.0.0.0` and accepts Arena's `.e2b.app` preview hosts. Do not use Vite's development server as a production server.

## Connect a Supabase project

### 1. Apply the database migrations

Create a Supabase project, then run these files **in order** in its SQL Editor:

1. [`supabase/migrations/20260906000100_initial_schema.sql`](supabase/migrations/20260906000100_initial_schema.sql)
2. [`supabase/migrations/20260906000200_seed_content.sql`](supabase/migrations/20260906000200_seed_content.sql)

The first creates the tables, validation, RLS policies, triggers, and `site-assets` bucket. The second installs the five existing sample guides and initial site settings. The seed does not overwrite existing IDs; it is initial content, **not** a content synchronization tool. Re-running it can reinsert sample games you previously deleted.

Alternatively, with the Supabase CLI installed and authenticated on your machine:

```sh
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```

Inspect the SQL and back up an existing project first. These migrations assume the table names and bucket are not already used by another app. Do not run `db reset` against a hosted production database.

### 2. Set the public browser environment

In `.env.local`, set values from your project's API settings:

```dotenv
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLIC_PUBLISHABLE_KEY
```

For an older project, use `VITE_SUPABASE_ANON_KEY` with the legacy **anon** JWT instead of the publishable key. Never use a `service_role` JWT, `sb_secret_` key, database password, or personal access token in a `VITE_*` variable. Vite exposes these variables to browsers. Startup/build validation rejects privileged keys in either supported key variable, including an unused fallback.

Restart Vite after changing `.env.local`. On a static host, set the same public build variables in the host's environment and **rebuild**. Do not put credentials in Git or chat.

### 3. Configure Auth and create the first admin

In Supabase **Authentication → URL Configuration**:

- Set **Site URL** to the actual site origin, for example `https://your-domain.example`.
- Add the precise root redirect URL for each environment, including its trailing slash: `https://your-domain.example/`, `http://localhost:5173/`, and the **actual** `https://<port>-<sandbox-id>.e2b.app/` origin if using an Arena preview. Prefer exact production allowlist entries over wildcards.
- Enable the Email provider and email confirmation. Set a minimum password length of at least **12** characters. Configure production SMTP before relying on confirmation or reset emails; the development mail service is not a production mail service.

Register an account using **Sign in → Create an account**, or create/invite it in the Supabase Auth dashboard. Confirm the account. Then promote only its UUID using the SQL Editor:

```sql
-- Replace this example email with the account you just created.
insert into public.admin_users (user_id)
select id from auth.users where lower(email) = lower('owner@example.com')
on conflict (user_id) do nothing;

-- Verify the intended user was added. A missing account inserts zero rows.
select a.user_id, u.email
from public.admin_users a
join auth.users u on u.id = a.user_id;
```

Sign out/in or reload the site. The **Admin** button appears after the server verifies membership. A signup `role` or `is_admin` field in user metadata grants **no** privileges. Browsers cannot read or modify the admin membership table. To revoke access:

```sql
delete from public.admin_users where user_id = 'THE_USER_UUID';
```

RLS enforces the revocation immediately on subsequent writes, even if a previously open browser still displays the dashboard. Public deployments should also review Auth rate limits and signup abuse controls. CAPTCHA is **not wired into this frontend**; add its widget/token flow before enabling a CAPTCHA requirement in Supabase.

### 4. Publish content

- **Site Assets:** edit the banner, logo, footer buttons, and optional verified wallet details, then select **Save Changes**.
- **Manage Games:** create/edit games, sections, instructions, images, and spoiler hints. New items have stable IDs. New games remain drafts until saved; canceling never publishes them.
- Images upload immediately to the public `site-assets` bucket. Saving stores a URL, not base64 data. Allowed types: JPEG, PNG, WebP, GIF; maximum **5 MiB**. SVG is intentionally excluded. Client checks inspect file signatures; Supabase enforces the bucket's MIME and size limits plus admin-only upload RLS.
- The bucket is **public**. Do not upload private files or sensitive QR data. Deleting a game or discarding an uploaded draft does **not** delete its images, since images can be shared. Review unused objects in Storage before removing them manually.
- Placeholder donation account numbers were removed. Only explicitly configured wallets open payment popups; a button's label alone never invents payment details. Verify every destination before publishing.
- Failed saves retain the draft and show an error. Revisions prevent stale edits from overwriting another admin's changes. If a conflict occurs, copy anything you need, discard the stale draft, reload published content, and reapply the edit.

## Data and permissions

| Resource                     | Public read | Who can write?                                                               |
| ---------------------------- | ----------- | ---------------------------------------------------------------------------- |
| `games`                      | Yes         | Admin insert/update/delete; IDs and revisions are server-protected on update |
| `site_settings`              | Yes         | Admin update of the singleton row                                            |
| `comments`                   | Yes         | Signed-in users insert; author or admin deletes; no client updates           |
| `admin_users`                | No          | SQL Editor / trusted server administration only                              |
| `site-assets` Storage bucket | Yes         | Admin upload in their UUID folder; admin deletion; no overwrites             |

Notes are scoped to a game and paginated. The database assigns their author ID, public display name, and timestamp, bounds the text to 2,000 characters, and enforces a 15-second per-user posting cooldown while a recent note exists. Auth email addresses are not copied into public notes. The cooldown is a basic guard, not comprehensive anti-abuse protection; deletion/account churn can bypass it. Use provider rate limits and further moderation controls for larger public launches.

Deleting a game deletes its notes. Deleting an Auth account deletes its notes and admin membership. Back up content before destructive operations.

**Progress and spoiler preferences remain device-local**, including for signed-in users. They are not synced to Supabase. Corrupt entries, duplicate/removed step IDs, blocked browser storage, StrictMode, and cross-tab changes are handled. Keep game, section and step IDs unchanged when updating instructions so existing progress continues to match.

## Existing local CMS data

The old `jinssi-site-content` entry is never overwritten or automatically uploaded. Preview mode reads valid records from it; malformed legacy records are ignored rather than allowed to crash the site. Configured mode reads Supabase exclusively and shows connection/schema errors instead of silently substituting sample content.

Before connecting an existing installation, back up `jinssi-site-content` from **browser DevTools → Application → Local Storage** on the original site's origin. It may contain images embedded as data URLs and old steps stored under `text` without IDs. Those records need manual repair to the current `title`/`description`/stable-ID model, and embedded images should be re-uploaded through Storage. Recreate/review the content in the authenticated editor; do not paste an unvalidated old blob directly into the database. Do not clear the original browser data until you verify the published result.

## Development and verification

```sh
npm run check             # ESLint (no warnings), TypeScript, build, unit/component/Postgres tests
npm run db:seed:check     # Confirms the generated seed matches bundled content
npm audit                # Dependency advisories
npx playwright install --with-deps chromium
npm run test:e2e          # Desktop/mobile preview + mocked Supabase browser flows
```

The test suite includes real PostgreSQL policy/trigger/constraint execution through **PGlite**, with minimal stubs only for Supabase's managed Auth/Storage tables. Browser tests use the real Supabase JavaScript SDK with intercepted HTTP responses; they do not use a hosted project or real credentials. A locally installed Chromium can optionally be selected with `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`.

CI runs the checks, seed validation, browser tests, and an audit for high-severity advisories. Test reports and generated build artifacts are ignored; test source files are included.

For a full local Supabase integration check, install its CLI and Docker, then:

```sh
supabase start
supabase db reset         # LOCAL only; loads both migrations including sample content
supabase status
```

Use the local public URL/anon key in `.env.local`, and confirm email through the local mail inbox. A remote Arena/browser preview **cannot** reach your sandbox's `localhost`; use a hosted Supabase project for that preview, or configure a browser-reachable HTTPS endpoint. Never bake sandbox-only localhost API URLs into a deployed frontend.

After schema changes, regenerate the public contract and run all checks:

```sh
# Hosted (after linking); review the generated diff, especially trigger-defaulted fields.
supabase gen types typescript --linked --schema public > src/types/database.ts
# Local alternative:
# supabase gen types typescript --local --schema public > src/types/database.ts
```

`src/types/database.ts` starts with deliberately narrow write types matching the column grants. Generated types may include additional columns, but the database remains the authority for write permissions. After changing bundled initial content, use `npm run db:seed:generate` **before the initial migrations have been deployed**. Once deployed, make a new migration rather than editing migration history.

## Before going live

- Apply migrations to your project and verify the first admin account.
- Test real registration, confirmation, sign-in/out, reset email/recovery, admin publishing, Storage uploads, and note moderation against the hosted project. Those hosted services cannot be verified without a configured project.
- Verify public contact/payment details, image rights, and walkthrough accuracy.
- Configure HTTPS, SMTP, backups, Auth rate limits, and appropriate production security headers. Content Security Policy must permit your Supabase HTTPS endpoint and the image/font hosts you actually use; do not block embedding on preview hosts.
- Set production build variables, run `npm run build`, and deploy `dist/`. Vite does not load `.env.local` dynamically after deployment.

See [the bug audit](docs/BUG_AUDIT.md) for the defects addressed and remaining boundaries.
