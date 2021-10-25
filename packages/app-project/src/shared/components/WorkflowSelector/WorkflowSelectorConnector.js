import { MobXProviderContext, observer } from 'mobx-react'
import { useContext } from 'react'

import WorkflowSelector from './WorkflowSelector'

function useStores(store) {
  const stores = useContext(MobXProviderContext)
  if (!store) {
    store = stores.store
  }

  return {
    uppLoaded: store.user.personalization.projectPreferences.isLoaded,
    uppSettings: store.user.personalization.projectPreferences.settings,
    userReadyState: store.user.loadingState,
    workflowAssignmentEnabled: store.project.experimental_tools.includes('workflow assignment'),
    workflowDescription: store.project.workflow_description
  }
}

function WorkflowSelectorConnector({ store, ...props }) {
  const {
    uppLoaded,
    uppSettings,
    userReadyState,
    workflowAssignmentEnabled = false,
    workflowDescription
  } = useStores(store)
  const assignedWorkflowID = uppSettings?.workflow_id || ''
  return (
    <WorkflowSelector
      assignedWorkflowID={assignedWorkflowID}
      uppLoaded={uppLoaded}
      userReadyState={userReadyState}
      workflowAssignmentEnabled={workflowAssignmentEnabled}
      workflowDescription={workflowDescription}
      {...props}
    />
  )
}

export default observer(WorkflowSelectorConnector)

