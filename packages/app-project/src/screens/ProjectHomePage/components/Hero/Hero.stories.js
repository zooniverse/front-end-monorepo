import { MediaContextProvider } from '@shared/components/Media'
import asyncStates from '@zooniverse/async-states'
import { Provider } from 'mobx-react'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import Router from 'next/router'

import Store from '@stores/Store'
import Hero from './'

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

const snapshot = {
  project: {
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
  },
  user: {
    loadingState: asyncStates.success,
    personalization: {
      projectPreferences: {
        loadingState: asyncStates.success
      }
    }
  }
}

const store = Store.create(snapshot)

function MockProjectContext(Story) {
  return (
    <RouterMock>
      <MediaContextProvider>
        <Provider store={store}>
          <Story />
        </Provider>
      </MediaContextProvider>
    </RouterMock>
  )
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

export default {
  title: 'Project App / Screens / Project Home / Hero',
  component: Hero,
  args: {
    isWide: true
  },
  decorators: [MockProjectContext]
}

export function Default({ isWide }) {
  return <Hero isWide={isWide} workflows={WORKFLOWS} />
}

export function SmallScreen() {
  return <Hero isWide={false} workflows={WORKFLOWS} />
}

SmallScreen.parameters = {
  viewport: {
    defaultViewport: 'iphone5'
  }
}

const ORGANIZATION = {
  id: '1',
  listed: true,
  slug: 'brbcornell/nest-quest-go',
  title: 'Nest Quest Go'
}

export function WithOrganization({ isWide }) {
  return (
    <Hero
      isWide={isWide}
      organization={ORGANIZATION}
      workflows={WORKFLOWS}
    />
  )
}
