import asyncStates from '@zooniverse/async-states'
import { Provider } from 'mobx-react'
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'
import Router from 'next/router'

import Store from '@stores/Store'
import Hero from './'

const ORGANIZATION = {
  id: '1',
  listed: true,
  slug: 'brbcornell/nest-quest-go',
  strings: {
    title: 'Nest Quest Go'
  }
}

const PROJECT = {
  background: {
    src: 'https://panoptes-uploads.zooniverse.org/production/project_background/260e68fd-d3ec-4a94-bb32-43ff91d5579a.jpeg'
  },
  slug: 'brbcornell/nest-quest-go-western-bluebirds',
  strings: {
    description: 'Learn about and help document the wonders of nesting Western Bluebirds.',
    display_name: 'Nest Quest Go: Western Bluebirds',
    introduction: 'Bluebirds introduction',
    workflow_description: 'Choose your own adventure! There are many ways to engage with this project!'
  }
}

const USER = {
  loadingState: asyncStates.success,
  personalization: {
    projectPreferences: {
      loadingState: asyncStates.success
    }
  }
}

const WORKFLOWS = [
  {
    completeness: 0.65,
    default: false,
    displayName: 'The Family and the Fishing Net',
    id: '12345'
  },
  {
    completeness: 0,
    default: false,
    displayName: 'Games Without Frontiers',
    id: '7890'
  },
  {
    completeness: 0.99,
    default: false,
    displayName: 'Shock The Monkey',
    id: '5678'
  }
]

function RouterMock({ children }) {
  const mockRouter = {
    locale: 'en',
    push: () => {},
    prefetch: () => new Promise((resolve, reject) => {}),
    query: {
      owner: 'test-owner',
      project: 'test-project'
    }
  }

  Router.router = mockRouter

  return (
    <RouterContext.Provider value={mockRouter}>
      {children}
    </RouterContext.Provider>
  )
}

export default {
  title: 'Project App / Screens / Project Home / Hero',
  component: Hero,
  args: {
    isWide: true
  }
}

const snapshot = {
  project: PROJECT,
  user: USER
}
const store = Store.create(snapshot)

export function Default({ isWide }) {
  return (
    <RouterMock>
      <Provider store={store}>
        <Hero isWide={isWide} workflows={WORKFLOWS} />
      </Provider>
    </RouterMock>
  )
}

const snapshotWithOrganization = {
  organization: ORGANIZATION,
  project: PROJECT,
  user: USER
}
const storeWithOrganization = Store.create(snapshotWithOrganization)

export function WithOrganization({ isWide }) {
  return (
    <RouterMock>
      <Provider store={storeWithOrganization}>
        <Hero isWide={isWide} workflows={WORKFLOWS} />
      </Provider>
    </RouterMock>
  )
}
