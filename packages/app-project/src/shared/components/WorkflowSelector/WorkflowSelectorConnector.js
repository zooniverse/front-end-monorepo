import { MobXProviderContext, observer } from 'mobx-react'
import * as React from 'react'

import WorkflowSelector from './WorkflowSelector'

function useStores() {
  const { store } = React.useContext(MobXProviderContext)

  console.log('store', store)
  return {
    uppSettings: store.user.personalization.projectPreferences.settings,
    userReadyState: store.user.loadingState,
    workflowDescription: store.project.workflow_description
  }
}

function WorkflowSelectorConnector(props) {
  const { uppSettings, userReadyState, workflowDescription } = useStores()
  const assignedWorkflowID = uppSettings?.workflow_id || ''
  return (
    <WorkflowSelector
      assignedWorkflowID={assignedWorkflowID}
      userReadyState={userReadyState}
      workflowDescription={workflowDescription}
      {...props}
    />
  )
}

export default observer(WorkflowSelectorConnector)

