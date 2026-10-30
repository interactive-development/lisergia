import { Elysia } from 'elysia'

import page from '../controllers/page'

const router = new Elysia({ name: 'lisergia.router' })
  .get('/', ({ request }) => page(undefined, request))
  .get('/:slug', ({ params, request }) => page(params.slug, request))

export { router }
