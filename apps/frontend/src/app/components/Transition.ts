import { type ApplicationManager, Component } from '@lisergia/core'

const EASE_OUT_EXPO = 'cubic-bezier(0.19, 1, 0.22, 1)'

async function animate(element: HTMLElement, keyframes: Keyframe[], duration: number, easing: string) {
  const animation = element.animate(keyframes, { duration, easing, fill: 'forwards' })

  await animation.finished

  animation.commitStyles()
  animation.cancel()
}

export default class Transition extends Component {
  constructor({ application }: { application: ApplicationManager }) {
    super({
      application,
      id: 'transition',
    })
  }

  async onTransition(application: ApplicationManager) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!prefersReducedMotion) {
      await animate(
        application.currentPage!.element,
        [
          { opacity: 1, transform: 'translateY(0)' },
          { opacity: 0, transform: 'translateY(-4rem)' },
        ],
        400,
        'ease-in',
      )
    }

    application.currentPage!.element.remove()
    application.currentPage!.destroy()

    const next = application.nextPage.element!.firstElementChild as HTMLElement

    if (!prefersReducedMotion) {
      next.style.opacity = '0'
    }

    application.element.appendChild(next)

    application.createPage(application.nextPage.template)

    window.posthog?.capture('page_navigated', {
      template: application.nextPage.template,
      $current_url: window.location.href,
    })

    if (!prefersReducedMotion) {
      await animate(
        application.currentPage!.element,
        [
          { opacity: 0, transform: 'translateY(6rem)' },
          { opacity: 1, transform: 'translateY(0)' },
        ],
        1200,
        EASE_OUT_EXPO,
      )
    }
  }
}
