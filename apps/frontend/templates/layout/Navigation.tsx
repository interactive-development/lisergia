import { getViewUrl, type View, views } from '../../views'

export default function Navigation({ view }: { view: View }) {
  return (
    <nav className="navigation">
      <a className="navigation__logo" href="/">
        Lisergia
      </a>

      <ul className="navigation__list">
        {views.map((item) => (
          <li key={item.slug}>
            <a
              className={`navigation__link${item === view ? ' navigation__link--active' : ''}`}
              href={getViewUrl(item)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
