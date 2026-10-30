import { MobXProviderContext, observer } from 'mobx-react'
import { useContext } from 'react'

import WorkflowSelector from './WorkflowSelector'

function useStores(mockStore) {
  const stores = useContext(MobXProviderContext)
  const store = mockStore || stores.store

  return {
    uppLoaded: store.user.personalization.projectPreferences.isLoaded,
    uppSettings: store.user.personalization.projectPreferences.settings,
    userReadyState: store.user.loadingState,
    externalWorkflowEnabled: store.project.experimental_tools.includes('external workflow'),
    workflowAssignmentEnabled: store.project.experimental_tools.includes('workflow assignment'),
    workflowDescription: store.project.workflow_description
  }
}

function WorkflowSelectorConnector({ mockStore, ...props }) {
  const {
    externalWorkflowEnabled = false,
    uppLoaded,
    uppSettings,
    userReadyState,
    workflowAssignmentEnabled = false,
    workflowDescription
  } = useStores(mockStore)
  const assignedWorkflowID = uppSettings?.workflow_id || ''
  return (
    <WorkflowSelector
      assignedWorkflowID={assignedWorkflowID}
      externalWorkflowEnabled={externalWorkflowEnabled}
      uppLoaded={uppLoaded}
      userReadyState={userReadyState}
      workflowAssignmentEnabled={workflowAssignmentEnabled}
      workflowDescription={workflowDescription}
      {...props}
    />
  )
}

export default observer(WorkflowSelectorConnector)

