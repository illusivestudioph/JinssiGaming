import type { Page, Route } from '@playwright/test';
import { defaultContent } from '../../src/data/siteContent';
import type { Database } from '../../src/types/database';
import type { User } from '@supabase/supabase-js';

type GameRow = Database['public']['Tables']['games']['Row'];
type CommentRow = Database['public']['Tables']['comments']['Row'];
const adminId = '11111111-1111-4111-8111-111111111111';
const memberId = '22222222-2222-4222-8222-222222222222';
const png = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Wl6B6EAAAAASUVORK5CYII=',
  'base64',
);

export async function mockSupabase(page: Page) {
  const state = {
    games: defaultContent.games.map((game): GameRow => ({
      id: game.id,
      title: game.title,
      developer: game.developer,
      category: game.category,
      description: game.description,
      accent_color: game.accentColor,
      cover_image: game.coverImage,
      cover_alt: game.coverAlt,
      walkthrough: JSON.parse(JSON.stringify(game.walkthrough)),
      revision: 1,
      updated_at: new Date().toISOString(),
    })),
    settings: {
      id: true,
      hero_image: defaultContent.heroImage,
      logo_image: defaultContent.logoImage,
      cta_links: JSON.parse(JSON.stringify(defaultContent.ctaLinks)),
      revision: 1,
      updated_at: new Date().toISOString(),
    },
    user: null as User | null,
    comments: [] as CommentRow[],
    failNextGameSave: false,
    failContent: false,
    uploads: [] as string[],
  };
  const json = (route: Route, body: unknown, status = 200) =>
    route.fulfill({
      status,
      contentType: 'application/json',
      body: JSON.stringify(body),
      headers: {
        'access-control-allow-origin': '*',
        'access-control-expose-headers': 'Retry-After',
        'retry-after': '0',
      },
    });
  // Follow the SDK's actual Accept header: maybeSingle now requests an array
  // and converts [] to null client-side; single requests a singular object.
  const one = (route: Route, body: unknown, status = 200) =>
    json(
      route,
      route.request().headers().accept?.includes('vnd.pgrst.object')
        ? body
        : body === null
          ? []
          : [body],
      status,
    );
  const session = () => {
    const time = Math.floor(Date.now() / 1000);
    const encode = (value: unknown) => Buffer.from(JSON.stringify(value)).toString('base64url');
    return {
      access_token: `${encode({ alg: 'HS256', typ: 'JWT' })}.${encode({ sub: state.user!.id, aud: 'authenticated', role: 'authenticated', iat: time, exp: time + 3600 })}.test-signature`,
      refresh_token: 'test-refresh-token',
      expires_in: 3600,
      expires_at: time + 3600,
      token_type: 'bearer',
      user: state.user,
    };
  };
  await page.route('https://jinssi-e2e.supabase.co/**', async (route) => {
    const request = route.request();
    const url = new URL(request.url());
    const method = request.method();
    if (method === 'OPTIONS')
      return route.fulfill({
        status: 204,
        headers: {
          'access-control-allow-origin': '*',
          'access-control-allow-headers': '*',
          'access-control-allow-methods': '*',
        },
      });
    const isAdmin = state.user?.id === adminId;
    const id = url.searchParams.get('id')?.slice(3);
    if (url.pathname.endsWith('/auth/v1/token')) {
      const body = request.postDataJSON();
      state.user = {
        id: body.email === 'admin@example.test' ? adminId : memberId,
        email: body.email,
        aud: 'authenticated',
        app_metadata: { provider: 'email' },
        user_metadata: { display_name: 'Test Player' },
        created_at: new Date().toISOString(),
      };
      return json(route, session());
    }
    if (url.pathname.endsWith('/auth/v1/user'))
      return state.user
        ? json(route, state.user)
        : json(route, { message: 'Not authenticated' }, 401);
    if (url.pathname.endsWith('/auth/v1/logout')) {
      state.user = null;
      return route.fulfill({ status: 204 });
    }
    if (url.pathname.endsWith('/rpc/is_admin')) return json(route, isAdmin);
    if (url.pathname.includes('/storage/v1/object/public/'))
      return route.fulfill({ contentType: 'image/png', body: png });
    if (url.pathname.includes('/storage/v1/object/site-assets/')) {
      if (!isAdmin) return json(route, { message: 'Admin required' }, 403);
      state.uploads.push(url.pathname);
      return json(route, { Id: crypto.randomUUID(), Key: url.pathname.split('/object/')[1] });
    }
    if (state.failContent && method === 'GET')
      return json(route, { message: 'Database offline', code: '503' }, 503);
    if (url.pathname.endsWith('/site_settings')) {
      if (method === 'GET') return one(route, state.settings);
      if (!isAdmin) return json(route, { message: 'Admin required' }, 403);
      state.settings = {
        ...state.settings,
        ...request.postDataJSON(),
        revision: state.settings.revision + 1,
      };
      return one(route, state.settings);
    }
    if (url.pathname.endsWith('/games')) {
      if (method === 'GET') return json(route, state.games);
      if (!isAdmin) return json(route, { message: 'Admin required' }, 403);
      if (state.failNextGameSave) {
        state.failNextGameSave = false;
        return json(route, { message: 'Save failed. Please retry.', code: '503' }, 503);
      }
      if (method === 'POST') {
        const row = {
          ...request.postDataJSON(),
          revision: 1,
          updated_at: new Date().toISOString(),
        };
        state.games.push(row);
        return one(route, row, 201);
      }
      const game = state.games.find(
        (value) =>
          value.id === id && value.revision === Number(url.searchParams.get('revision')?.slice(3)),
      );
      if (!game) return one(route, null);
      if (method === 'DELETE') {
        state.games = state.games.filter((value) => value !== game);
        return one(route, { id });
      }
      const body = request.postDataJSON();
      if ('id' in body || 'revision' in body)
        return json(route, { message: 'Cannot update server-managed fields' }, 403);
      Object.assign(game, body, { revision: game.revision + 1 });
      return one(route, game);
    }
    if (url.pathname.endsWith('/comments')) {
      if (method === 'GET')
        return json(
          route,
          state.comments.filter(
            (comment) => comment.game_id === url.searchParams.get('game_id')?.slice(3),
          ),
        );
      if (!state.user) return json(route, { message: 'Sign in required' }, 403);
      if (method === 'POST') {
        const body = request.postDataJSON();
        if (Object.keys(body).some((key) => !['game_id', 'text'].includes(key)))
          return json(route, { message: 'Client cannot choose authorship' }, 403);
        const comment = {
          ...body,
          id: crypto.randomUUID(),
          user_id: state.user.id,
          user_name: 'Test Player',
          created_at: new Date().toISOString(),
        };
        state.comments.unshift(comment);
        return one(route, comment, 201);
      }
      const note = state.comments.find((comment) => comment.id === id);
      if (note && (note.user_id === state.user.id || isAdmin)) {
        state.comments = state.comments.filter((value) => value !== note);
        return one(route, { id });
      }
      return json(route, { message: 'Delete denied' }, 403);
    }
    return json(route, { message: `Unhandled test route: ${method} ${url.pathname}` }, 500);
  });
  return state;
}

export async function signIn(page: Page, email: string) {
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  const dialog = page.getByRole('dialog');
  await dialog.getByLabel('Email', { exact: true }).fill(email);
  await dialog.getByLabel('Password', { exact: true }).fill('test-password-123');
  await dialog.getByRole('button', { name: 'Sign in', exact: true }).click();
}
