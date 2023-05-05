import { MediaContextProvider } from '@shared/components/Media'
import asyncStates from '@zooniverse/async-states'
import { Provider } from 'mobx-react'
import { applySnapshot } from 'mobx-state-tree'
import { RouterContext } from 'next/dist/shared/lib/router-context'

import initStore from '@stores'
import Hero from './'

const router = {
  locale: 'en',
  query: {
    owner: 'test-owner',
    project: 'test-project'
  },
  prefetch() {
    return Promise.resolve()
  }
}

const snapshot = {
  project: {
    background: {
      src: 'https://panoptes-uploads.zooniverse.org/production/project_background/260e68fd-d3ec-4a94-bb32-43ff91d5579a.jpeg'
    },
    description: 'Learn about and help document the wonders of nesting Western Bluebirds.',
    display_name: 'Nest Quest Go: Western Bluebirds',
    slug: 'brbcornell/nest-quest-go-western-bluebirds',
    workflow_description: `Choose your own adventure! There are many ways to engage with this project:  
      1) "Nest Site": Smartphone-friendly, helps us understand where Western Bluebirds build their nests.  
      2) "Location": Smartphone-friendly, series of questions on the geographic location of the nest.  
      3) "Nest Attempt: Smartphone-friendly, for data-entry lovers to record nest attempt data on cards.  
      4) "Comments": For transcription lovers, we ask you to transcribe all the written comments on the cards.`
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

const store = initStore(false, snapshot)
applySnapshot(store.user, snapshot.user)

function MockProjectContext({ children }) {
  return (
    <RouterContext.Provider value={router}>
      <MediaContextProvider>
        <Provider store={store}>
          {children}
        </Provider>
      </MediaContextProvider>
    </RouterContext.Provider>
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
  }
}

export function Default({ isWide }) {
  return (
    <MockProjectContext>
      <Hero
        isWide={isWide}
        workflows={WORKFLOWS}
      />
    </MockProjectContext>
  )
}

export function SmallScreen() {
  return (
    <MockProjectContext>
      <Hero
        isWide={false}
        workflows={WORKFLOWS}
      />
    </MockProjectContext>
  )
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
    <MockProjectContext>
      <Hero
        isWide={isWide}
        organization={ORGANIZATION}
        workflows={WORKFLOWS}
      />
    </MockProjectContext>
  )
}
