import { useContext } from 'react'
import PropTypes from 'prop-types'
import { MobXProviderContext, observer } from 'mobx-react'
import WorkflowAssignmentModalContainer from './WorkflowAssignmentModalContainer'

function useStore(store) {
  const stores = useContext(MobXProviderContext)
  if (!store) {
    store = stores.store
  }

  return {
    assignedWorkflowID: store.user.personalization.projectPreferences.settings?.workflow_id,
    loadingState: store.user.personalization.projectPreferences.loadingState,
    promptAssignment: store.user.personalization.projectPreferences.promptAssignment
  }
}

function WorkflowAssignmentModalConnector({ currentWorkflowID, store, ...rest }) {
  const {
    assignedWorkflowID = '',
    loadingState,
    promptAssignment
  } = useStore(store)

  return (
    <WorkflowAssignmentModalContainer
      assignedWorkflowID={assignedWorkflowID}
      currentWorkflowID={currentWorkflowID}
      loadingState={loadingState}
      promptAssignment={promptAssignment}
      {...rest}
    />
  )
}

WorkflowAssignmentModalConnector.propTypes = {
  currentWorkflowID: PropTypes.string.isRequired
}

export default observer(WorkflowAssignmentModalConnector)