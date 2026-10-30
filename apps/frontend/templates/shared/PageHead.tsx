import { site, type View } from '../../views'
import { bundle, fonts } from '../manifest'

const isDev = process.env.NODE_ENV !== 'production'
const vitePort = process.env.VITE_PORT ?? process.env.BROWSERSYNC_PORT ?? '5173'
const viteOrigin = process.env.VITE_ORIGIN ?? `http://localhost:${vitePort}`
const assetOrigin = isDev ? viteOrigin : ''

export default function PageHead({ view }: { view: View }) {
  const title = view.slug === 'home' ? site.name : `${site.name} | ${view.label}`
  const image = `${site.url}/open-graph.png`

  return (
    <>
      {/* Default */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, minimal-ui" />

      <title>{title}</title>

      <meta name="description" content={site.description} />

      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />

      <meta property="og:title" content={title} />
      <meta name="twitter:title" content={title} />

      <meta property="og:image" content={image} />
      <meta name="twitter:image" content={image} />

      <meta property="og:description" content={site.description} />
      <meta name="twitter:description" content={site.description} />

      {/* Stylesheets */}
      {fonts.map((font) => (
        <link
          as="font"
          crossOrigin="anonymous"
          href={`${assetOrigin}${font}`}
          key={font}
          rel="preload"
          type="font/woff2"
        />
      ))}

      {isDev ? (
        <link rel="stylesheet" href={`${viteOrigin}/styles/index.scss`} type="text/css" />
      ) : (
        bundle.css.map((href) => <link href={href} key={href} rel="stylesheet" type="text/css" />)
      )}

      {/* Favicons */}
      <meta name="apple-mobile-web-app-title" content={site.name} />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
      <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
    </>
  )
}
