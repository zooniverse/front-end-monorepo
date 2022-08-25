import asyncStates from '@zooniverse/async-states'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import { RouterContext } from 'next/dist/shared/lib/router-context'

import WorkflowSelector from './WorkflowSelector'
import * as subcomponents from './components'

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

const WORKFLOWS = [
  {
    completeness: 0.65,
    configuration: {
      level: 1
    },
    default: false,
    displayName: 'The Family and the Fishing Net',
    id: '12345'
  },
  {
    completeness: 0,
    configuration: {
      level: 2
    },
    default: false,
    displayName: 'Games Without Frontiers',
    grouped: true,
    id: '7890'
  },
  {
    completeness: 0.99,
    configuration: {
      level: 3
    },
    default: false,
    displayName: 'Shock The Monkey',
    grouped: true,
    prioritized: true,
    id: '5678'
  }
]

function StoryContext (props) {
  const { children, theme } = props

  return (
    <RouterContext.Provider value={router}>
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
    </RouterContext.Provider>
  )
}

export default {
  title: 'Project App / Shared / Workflow Selector',
  component: WorkflowSelector,
  subcomponents,
  argTypes: {
    userReadyState: {
      control: {
        type: 'select',
        options: asyncStates
      }
    }
  },
  parameters: {
    viewport: {
      defaultViewport: 'responsive'
    }
  }
}

export function Default({ assignedWorkflowID, dark, uppLoaded, userReadyState, workflowAssignmentEnabled, workflowDescription, workflows }) {
  return (
    <StoryContext theme={{ ...zooTheme, dark }}>
      <WorkflowSelector
        assignedWorkflowID={assignedWorkflowID}
        uppLoaded={uppLoaded}
        userReadyState={userReadyState}
        workflowAssignmentEnabled={workflowAssignmentEnabled}
        workflowDescription={workflowDescription}
        workflows={workflows}
      />
    </StoryContext>
  )
}

Default.args = {
  assignedWorkflowID: '',
  dark: false,
  uppLoaded: true,
  userReadyState: asyncStates.success,
  workflowAssignmentEnabled: false,
  workflowDescription: store.project.workflow_description,
  workflows: WORKFLOWS
}

export function WithLevels({ assignedWorkflowID, dark, uppLoaded, userReadyState, workflowAssignmentEnabled, workflowDescription, workflows }) {
  return (
    <StoryContext theme={{ ...zooTheme, dark }}>
      <WorkflowSelector
        assignedWorkflowID={assignedWorkflowID}
        uppLoaded={uppLoaded}
        workflowAssignmentEnabled={workflowAssignmentEnabled}
        workflowDescription={workflowDescription}
        userReadyState={userReadyState}
        workflows={workflows}
      />
    </StoryContext>
  )
}

WithLevels.args = {
  assignedWorkflowID: '7890',
  dark: false,
  uppLoaded: true,
  userReadyState: asyncStates.success,
  workflowAssignmentEnabled: true,
  workflowDescription: '',
  workflows: WORKFLOWS
}

export function Loading({ dark, uppLoaded, userReadyState, workflowAssignmentEnabled, workflowDescription, workflows }) {
  return (
    <StoryContext theme={{ ...zooTheme, dark }}>
      <WorkflowSelector
        uppLoaded={uppLoaded}
        userReadyState={userReadyState}
        workflowDescription={workflowDescription}
        workflows={workflows}
      />
    </StoryContext>
  )
}

Loading.args = {
  dark: false,
  uppLoaded: false,
  userReadyState: asyncStates.loading,
  workflowAssignmentEnabled: false,
  workflowDescription: store.project.workflow_description,
  workflows: WORKFLOWS
}

export function Error({ dark, uppLoaded, userReadyState, workflowAssignmentEnabled, workflowDescription, workflows }) {
  return (
    <StoryContext theme={{ ...zooTheme, dark }}>
      <WorkflowSelector
        uppLoaded={uppLoaded}
        userReadyState={userReadyState}
        workflowDescription={workflowDescription}
        workflows={workflows}
      />
    </StoryContext>
  )
}

Error.args = {
  dark: false,
  uppLoaded: false,
  userReadyState: asyncStates.error,
  workflowAssignmentEnabled: false,
  workflowDescription: store.project.workflow_description,
  workflows: WORKFLOWS
}
