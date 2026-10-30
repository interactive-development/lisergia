# Setup

Copy the repository root `.env.example` to `.env` at the repository root:

```env
POSTHOG_KEY=phc_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
POSTHOG_HOST=https://us.i.posthog.com

VITE_PORT=3002
```

## Environment Variables

- `POSTHOG_KEY`: Public project token used to initialize PostHog when paired with `POSTHOG_HOST`.
- `POSTHOG_HOST`: PostHog ingestion host for the project's region (for example, `https://us.i.posthog.com` or `https://eu.i.posthog.com`).
- `VITE_PORT`: Overrides the default Vite client asset port.

## Content

The site is four views (Index, Work, About and Contact) defined in `views.ts`. Every view is rendered on the server, and Lisergia fetches the next one when a link is clicked and animates the switch in `src/app/components/Transition.ts`.

## Deployment

The production Worker is routed to `https://lisergia.dev`. Authenticate once with `bunx wrangler login`, then configure `POSTHOG_KEY`, `POSTHOG_HOST`, and optional `ASSET_VERSION` as Worker variables. The PostHog project token is safe to expose in the browser; do not use a PostHog personal API key.

```sh
bun run deploy:web
```

The deploy command retains dashboard-managed variables. Cloudflare serves files in `build` through Workers Static Assets, while views execute in the Elysia Worker.

## Commands

- `dev`: Prepares static assets, then starts the Elysia Worker in Wrangler alongside Vite client HMR.
- `dev:assets`: Starts the Vite client asset watcher.
- `dev:worker`: Starts the local Elysia Worker with Wrangler.
- `build`: Builds the static frontend assets.
- `build:client`: Builds the static frontend assets.
- `check-types`: Checks the server, views, and client TypeScript without emitting files.
- `deploy`: Builds the frontend and deploys the Cloudflare Worker.
- `lint`: Lints the codebase using Biome.
- `types`: Regenerates the Worker environment types from `wrangler.jsonc`.
