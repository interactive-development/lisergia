import { type ApplicationManager, Component } from '@lisergia/core'

export default class Navigation extends Component {
  declare classes: {
    active: string
  }

  declare elements: {
    links: NodeListOf<HTMLAnchorElement>
  }

  constructor({ application }: { application: ApplicationManager }) {
    super({
      application,
      classes: {
        active: 'navigation__link--active',
      },
      element: '.navigation',
      elements: {
        links: '.navigation__link',
      },
    })

    application.on('route', this.onChange)

    this.addDisposer(() => {
      application.off('route', this.onChange)
    })
  }

  onChange() {
    const { pathname } = new URL(this.application!.route, window.location.origin)

    this.elements.links.forEach((link) => {
      link.classList.toggle(this.classes.active, new URL(link.href).pathname === pathname)
    })
  }
}
