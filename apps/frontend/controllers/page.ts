import { createElement } from 'preact'
import { renderToString } from 'preact-render-to-string'

import { injectModulePreloads, preloadHeader } from '../templates/manifest'
import Page from '../templates/pages/Page'
import { getView, notFound, type View } from '../views'

const isDev = process.env.NODE_ENV !== 'production'

interface RenderedPage {
  body: string
  etag: string
  status: number
}

//
// Views only change on deploy, so each one is rendered once per isolate and
// revalidated by browsers through its ETag. Keyed by the resolved slug, so
// unknown paths share the not-found view.
//
const pages: Map<string, Promise<RenderedPage>> = new Map()

async function getETag(body: string) {
  const digest = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(body))
  const hash = Array.from(new Uint8Array(digest).slice(0, 12), (byte) => byte.toString(16).padStart(2, '0')).join('')

  return `"${hash}"`
}

function getPostHog() {
  const key = process.env.POSTHOG_PROJECT_TOKEN
  const host = process.env.POSTHOG_HOST

  return key && host ? { host, key } : undefined
}

function render(view: View) {
  const html = renderToString(createElement(Page, { posthog: getPostHog(), view }))
  const body = `<!DOCTYPE html>${isDev ? html : injectModulePreloads(html)}`

  return {
    body,
    status: view === notFound ? 404 : 200,
  }
}

function getPage(view: View) {
  const cached = pages.get(view.slug)

  if (cached) {
    return cached
  }

  const page = Promise.resolve().then(async () => {
    const { body, status } = render(view)

    return { body, etag: await getETag(body), status }
  })

  pages.set(view.slug, page)

  page.catch(() => {
    pages.delete(view.slug)
  })

  return page
}

export default async function renderPage(slug: string | undefined, request: Request) {
  const view = getView(slug)

  if (isDev) {
    const { body, status } = render(view)

    return new Response(body, {
      status,
      headers: {
        'content-type': 'text/html; charset=utf-8',
      },
    })
  }

  const { body, etag, status } = await getPage(view)

  const headers = {
    'cache-control': 'public, max-age=0, must-revalidate',
    'content-type': 'text/html; charset=utf-8',
    etag,
    link: preloadHeader,
  }

  if (status === 200 && request.headers.get('if-none-match')?.includes(etag)) {
    return new Response(null, { status: 304, headers })
  }

  return new Response(body, { status, headers })
}
