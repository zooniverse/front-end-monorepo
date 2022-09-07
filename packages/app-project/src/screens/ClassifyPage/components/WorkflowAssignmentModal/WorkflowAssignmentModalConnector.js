import { useContext } from 'react'
import PropTypes from 'prop-types'
import { MobXProviderContext, observer } from 'mobx-react'
import WorkflowAssignmentModalContainer from './WorkflowAssignmentModalContainer'

function useStore (mockStore) {
  const stores = useContext(MobXProviderContext)
  const store = mockStore || stores.store

  return {
    assignedWorkflowID: store.user.personalization.projectPreferences.settings?.workflow_id,
    promptAssignment: store.user.personalization.projectPreferences.promptAssignment
  }
}

function WorkflowAssignmentModalConnector ({ currentWorkflowID, mockStore, ...rest }) {
  const {
    assignedWorkflowID = '',
    promptAssignment
  } = useStore(mockStore)

  return (
    <WorkflowAssignmentModalContainer
      assignedWorkflowID={assignedWorkflowID}
      currentWorkflowID={currentWorkflowID}
      promptAssignment={promptAssignment}
      {...rest}
    />
  )
}

WorkflowAssignmentModalConnector.propTypes = {
  currentWorkflowID: PropTypes.string.isRequired
}

export default observer(WorkflowAssignmentModalConnector)
