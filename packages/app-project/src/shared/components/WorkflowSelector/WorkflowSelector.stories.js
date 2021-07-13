import asyncStates from '@zooniverse/async-states'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import { Provider } from 'mobx-react'

import WorkflowSelector from './WorkflowSelector'

const store = {
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

function StoryContext (props) {
  const { children, theme } = props

  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={theme}
      themeMode={(theme.dark) ? 'dark' : 'light'}
    >
      <Provider store={store}>
        {children}
      </Provider>
    </Grommet>
  )
}

function onSelect(event, workflow) {
  event.preventDefault()
  alert(workflow.displayName)
}

export default {
  title: 'Project App / Shared / Workflow Selector',
  component: WorkflowSelector,
  args: {
    dark: false
  },
  parameters: {
    viewport: {
      defaultViewport: 'responsive'
    }
  }
}

export function Default({ dark }) {
  return (
    <StoryContext theme={{ ...zooTheme, dark }}>
      <WorkflowSelector
        onSelect={onSelect}
        userReadyState={asyncStates.success}
        workflows={WORKFLOWS}
      />
    </StoryContext>
  )
}

export function Loading({ dark }) {
  return (
    <StoryContext theme={{ ...zooTheme, dark }}>
      <WorkflowSelector
        onSelect={onSelect}
        userReadyState={asyncStates.loading}
        workflows={WORKFLOWS}
      />
    </StoryContext>
  )
}

export function Error({ dark }) {
  return (
    <StoryContext theme={{ ...zooTheme, dark }}>
      <WorkflowSelector
        onSelect={onSelect}
        userReadyState={asyncStates.error}
        workflows={WORKFLOWS}
      />
    </StoryContext>
  )
}

