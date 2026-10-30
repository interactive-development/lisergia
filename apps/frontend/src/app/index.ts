import '../styles/index.scss'

import {
  Application,
  type ApplicationComponentData,
  type ApplicationRoute,
  type Component,
  type ComponentParameters,
  type Page,
  type PageParameters,
} from '@lisergia/core'

import Navigation from './components/Navigation'
import Transition from './components/Transition'

import Standard from './templates/Standard'

const components: Array<ApplicationComponentData> = [
  {
    component: Navigation as new (params?: ComponentParameters) => Component,
  },
  {
    component: Transition as new (params?: ComponentParameters) => Component,
  },
]

const routes: Array<ApplicationRoute> = [
  {
    component: Standard as new (params?: PageParameters) => Page,
    template: 'page',
  },
]

Application.initRoutes(routes)

Application.initPage()

Application.initComponents(components)
