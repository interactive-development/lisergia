import { type View, views } from '../../views'
import Navigation from '../layout/Navigation'
import PageHead from '../shared/PageHead'
import Scripts from '../shared/Scripts'

interface PageProps {
  posthog?: {
    host: string
    key: string
  }
  view: View
}

export default function Page({ posthog, view }: PageProps) {
  const index = views.indexOf(view)
  const number = index === -1 ? '404' : String(index + 1).padStart(2, '0')

  return (
    <html data-template="page" id={view.slug} lang="en">
      <head>
        <PageHead view={view} />
      </head>
      <body>
        <Navigation view={view} />

        <div className="app">
          <div className="page">
            <div className="page__wrapper">
              <main className="view">
                <p className="view__label">
                  [ {number} ] {view.label}
                </p>

                <h1 className="view__title">{view.title}</h1>

                <p className="view__description">{view.description}</p>

                {view.items && (
                  <ul className="view__list">
                    {view.items.map((item) => (
                      <li className="view__item" key={item.title}>
                        <span className="view__item__title">{item.title}</span>
                        {item.url ? (
                          <a className="view__item__text" href={item.url}>
                            {item.text}
                          </a>
                        ) : (
                          <span className="view__item__text">{item.text}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </main>
            </div>
          </div>
        </div>

        <Scripts posthog={posthog} />
      </body>
    </html>
  )
}
