import asyncStates from '@zooniverse/async-states'
import { Box } from 'grommet'
import { Provider } from 'mobx-react'
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'
import { http, HttpResponse } from 'msw'

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
      level: 4
    },
    default: false,
    displayName: 'Shock The Monkey',
    grouped: true,
    prioritized: true,
    id: '5678'
  }
]

function StoryContext(Story) {
  return (
    <RouterContext.Provider value={router}>
      <Provider store={store}>
        <Box pad='small'>
          <Story />
        </Box>
      </Provider>
    </RouterContext.Provider>
  )
}

export default {
  title: 'Project App / Shared / Workflow Selector',
  component: WorkflowSelector,
  decorators: [StoryContext],
  argTypes: {
    userReadyState: {
      control: {
        type: 'select',
        options: asyncStates
      }
    }
  }
}

export function Default({
  assignedWorkflowID,
  uppLoaded,
  userReadyState,
  workflowAssignmentEnabled,
  workflowDescription,
  workflows
}) {
  return (
    <WorkflowSelector
      assignedWorkflowID={assignedWorkflowID}
      uppLoaded={uppLoaded}
      userReadyState={userReadyState}
      workflowAssignmentEnabled={workflowAssignmentEnabled}
      workflowDescription={workflowDescription}
      workflows={workflows}
    />
  )
}

Default.args = {
  assignedWorkflowID: '',
  uppLoaded: true,
  userReadyState: asyncStates.success,
  workflowAssignmentEnabled: false,
  workflowDescription: store.project.workflow_description,
  workflows: WORKFLOWS
}

export function WithLevels({
  assignedWorkflowID,
  uppLoaded,
  userReadyState,
  workflowAssignmentEnabled,
  workflowDescription,
  workflows
}) {
  return (
    <WorkflowSelector
      assignedWorkflowID={assignedWorkflowID}
      uppLoaded={uppLoaded}
      workflowAssignmentEnabled={workflowAssignmentEnabled}
      workflowDescription={workflowDescription}
      userReadyState={userReadyState}
      workflows={workflows}
    />
  )
}

WithLevels.args = {
  assignedWorkflowID: '7890',
  uppLoaded: true,
  userReadyState: asyncStates.success,
  workflowAssignmentEnabled: true,
  workflowDescription: '',
  workflows: WORKFLOWS
}

export function MissingLevels({
  assignedWorkflowID,
  uppLoaded,
  userReadyState,
  workflowAssignmentEnabled,
  workflowDescription,
  workflows
}) {
  return (
    <WorkflowSelector
      assignedWorkflowID={assignedWorkflowID}
      uppLoaded={uppLoaded}
      workflowAssignmentEnabled={workflowAssignmentEnabled}
      workflowDescription={workflowDescription}
      userReadyState={userReadyState}
      workflows={workflows}
    />
  )
}

MissingLevels.args = {
  assignedWorkflowID: '9012',
  uppLoaded: true,
  userReadyState: asyncStates.success,
  workflowAssignmentEnabled: true,
  workflowDescription: '',
  workflows: WORKFLOWS
}

MissingLevels.parameters = {
  msw: {
    handlers: [
      http.get('https://panoptes-staging.zooniverse.org/api/workflows', ({ request }) => {
        const { searchParams } = new URL(request.url)
        if (
          searchParams.get('fields') === 'configuration' &&
          searchParams.get('id') === '9012'
        ) {
          return HttpResponse.json({
            workflows: [
              {
                id: '9012',
                configuration: {
                  level: 3
                }
              }
            ]
          })
        }
        return new HttpResponse(null, { status: 404 })
      }),
      http.get('https://www.zooniverse.org/api/workflows', ({ request }) => {
        const { searchParams } = new URL(request.url)
        if (
          searchParams.get('fields') === 'configuration' &&
          searchParams.get('id') === '9012'
        ) {
          return HttpResponse.json({
            workflows: [
              {
                id: '9012',
                configuration: {
                  level: 3
                }
              }
            ]
          })
        }
        return new HttpResponse(null, { status: 404 })
      }),
    ],
  },
}

export function Loading({
  uppLoaded,
  userReadyState,
  workflowDescription,
  workflows
}) {
  return (
    <WorkflowSelector
      uppLoaded={uppLoaded}
      userReadyState={userReadyState}
      workflowDescription={workflowDescription}
      workflows={workflows}
    />
  )
}

Loading.args = {
  uppLoaded: false,
  userReadyState: asyncStates.loading,
  workflowAssignmentEnabled: false,
  workflowDescription: store.project.workflow_description,
  workflows: WORKFLOWS
}

export function Error({
  uppLoaded,
  userReadyState,
  workflowDescription,
  workflows
}) {
  return (
    <WorkflowSelector
      uppLoaded={uppLoaded}
      userReadyState={userReadyState}
      workflowDescription={workflowDescription}
      workflows={workflows}
    />
  )
}

Error.args = {
  uppLoaded: false,
  userReadyState: asyncStates.error,
  workflowAssignmentEnabled: false,
  workflowDescription: store.project.workflow_description,
  workflows: WORKFLOWS
}
