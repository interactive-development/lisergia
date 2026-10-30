export interface ViewItem {
  text: string
  title: string
  url?: string
}

export interface View {
  description: string
  items?: ViewItem[]
  label: string
  slug: string
  title: string
}

export const site = {
  description: 'An opinionated stack for websites that move.',
  name: 'Lisergia',
  url: 'https://lisergia.dev',
}

export const views: View[] = [
  {
    description:
      'Lisergia is a small stack for websites that animate: server-rendered views, a TypeScript runtime and a transition between every page.',
    label: 'Index',
    slug: 'home',
    title: 'Write code that moves.',
  },
  {
    description: 'Five packages, each doing one thing. Install what you need and leave the rest.',
    items: [
      { text: 'App, Page and Component classes with routing and transitions.', title: '@lisergia/core' },
      { text: 'Shared viewport and pointer state for every component.', title: '@lisergia/managers' },
      { text: 'Fluid rem scaling, breakpoints and resets.', title: '@lisergia/styles' },
      { text: 'Math, DOM and frame helpers.', title: '@lisergia/utilities' },
      { text: 'Builds and serves the frontend bundle.', title: '@lisergia/cli' },
    ],
    label: 'Work',
    slug: 'work',
    title: 'Packages.',
  },
  {
    description:
      'Motion should be the default on a marketing page, not a feature request. Lisergia keeps the runtime small so every transition stays cheap to build and easy to hand over.',
    items: [
      { text: 'Views render on the server. The client only enhances them.', title: 'Rendered first' },
      { text: 'Links fetch the next view and the runtime animates the switch.', title: 'Transitions' },
      { text: 'Lenis for scroll, Tempus for frames, nothing else by default.', title: 'Small' },
    ],
    label: 'About',
    slug: 'about',
    title: 'Motion by default.',
  },
  {
    description: 'Questions, talks or a website built with Lisergia.',
    items: [
      { text: 'luis@bizar.ro', title: 'Email', url: 'mailto:luis@bizar.ro' },
      { text: 'github.com/bizarro/lisergia', title: 'Source', url: 'https://github.com/bizarro/lisergia' },
    ],
    label: 'Contact',
    slug: 'contact',
    title: 'Say hello.',
  },
]

export const notFound: View = {
  description: 'This view does not exist.',
  label: '404',
  slug: 'not-found',
  title: 'Nothing here.',
}

export function getView(slug = 'home') {
  return views.find((view) => view.slug === slug) ?? notFound
}

export function getViewUrl(view: View) {
  return view.slug === 'home' ? '/' : `/${view.slug}/`
}
