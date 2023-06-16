import { RouterContext } from 'next/dist/shared/lib/router-context'
import { Provider } from 'mobx-react'
import asyncStates from '@zooniverse/async-states'

import Store from '@stores/Store'
import WorkflowAssignmentModalContainer from './WorkflowAssignmentModalContainer.js'

export default {
  title: 'Project App / Screens / Classify / Workflow Assignment / Assignment Modal',
  component: WorkflowAssignmentModalContainer,
}

const mockRouter = {
  locale: 'en',
  push() {},
  prefetch: () => new Promise((resolve, reject) => {}),
  query: {
    owner: 'zooniverse',
    project: 'snapshot-serengeti'
  }
}

const snapshot = {
  project: {
    strings: {
      display_name: 'Snapshot Serengeti'
    },
    links: {
      active_workflows: ['1234', '5678']
    }
  },
  user: {
    loadingState: asyncStates.success,
    personalization: {
      projectPreferences: {
        loadingState: asyncStates.success,
        promptAssignment: () => true, // Always return true to show the modal
        settings: {
          workflow_id: '1234'
        }
      }
    }
  }
}

const store = Store.create(snapshot)

export const Default = ({ currentWorkflowID }) => {
  return (
    <RouterContext.Provider value={mockRouter}>
      <Provider store={store}>
          <WorkflowAssignmentModalContainer currentWorkflowID={currentWorkflowID} />
      </Provider>
    </RouterContext.Provider>
  )
}

Default.args = {
  currentWorkflowID: '5678'
}
