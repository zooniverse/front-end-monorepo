import React from 'react'
import PropTypes from 'prop-types'
import { MobXProviderContext, observer } from 'mobx-react'
import WorkflowAssignmentModalContainer from './WorkflowAssignmentModalContainer'

function useStore() {
  const { store } = React.useContext(MobXProviderContext)

  return {
    projectPreferences: store.user.personalization.projectPreferences
  }
}

function WorkflowAssignmentModalConnector({ workflowID, ...rest }) {
  const { projectPreferences } = useStore()

  return (
    <WorkflowAssignmentModalContainer
      projectPreferences={projectPreferences}
      workflowID={workflowID}
      {...rest}
    />
  )
}

WorkflowAssignmentModalConnector.propTypes = {
  workflowID: PropTypes.string.isRequired
}

export default observer(WorkflowAssignmentModalConnector)