import { Provider } from 'mobx-react'
import { applySnapshot } from 'mobx-state-tree'
import asyncStates from '@zooniverse/async-states'

import initStore from '@stores'
import WorkflowAssignmentModalContainer from './WorkflowAssignmentModalContainer'

export default {
  title: 'Project App / Screens / Classify / Workflow Assignment / Assignment Modal',
  component: WorkflowAssignmentModalContainer
}

const snapshot = {
  project: {
    display_name: 'Test Project',
    links: {
      active_workflows: ['1234', '5678']
    }
  },
  user: {
    loadingState: asyncStates.success,
    personalization: {
      projectPreferences: {
        promptAssignment: () => true,
        settings: {
          workflow_id: '1234'
        }
      }
    }
  }
}

const store = initStore(false, snapshot)
applySnapshot(store.user, snapshot.user)

export function Default() {
  return (
  <Provider store={store}>
    <WorkflowAssignmentModalContainer currentWorkflowID='5678' />
  </Provider>
  )
}
