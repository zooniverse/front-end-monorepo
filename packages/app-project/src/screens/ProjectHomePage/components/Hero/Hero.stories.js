import { MediaContextProvider } from '@shared/components/Media'
import asyncStates from '@zooniverse/async-states'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import { Provider } from "mobx-react"
import { applySnapshot } from 'mobx-state-tree'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import PropTypes from 'prop-types'
import { Component } from 'react'
import sinon from 'sinon'

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

function MockProjectContext({ children, theme }) {
  return (
    <RouterContext.Provider value={router}>
      <MediaContextProvider>
        <Provider store={store}>
          <Grommet
            background={{
              dark: 'dark-1',
              light: 'light-1'
            }}
            theme={theme}
            themeMode={(theme.dark) ? 'dark' : 'light'}
          >
            {children}
          </Grommet>
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
  parameters: {
    viewport: {
      defaultViewport: 'responsive'
    }
  },
  args: {
    dark: false,
    isWide: true
  }
}

export function Default({ dark, isWide }) {
  return(
    <MockProjectContext theme={{ ...zooTheme, dark }}>
      <Hero
        isWide={isWide}
        workflows={WORKFLOWS}
      />
    </MockProjectContext>
  )
}

export function SmallScreen({ dark }) {
  return (
    <MockProjectContext theme={{ ...zooTheme, dark }}>
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
