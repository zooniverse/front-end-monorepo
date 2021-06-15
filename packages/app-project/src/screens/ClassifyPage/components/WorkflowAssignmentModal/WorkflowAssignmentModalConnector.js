import React from 'react'
import { MobXProviderContext, observer } from 'mobx-react'
import WorkflowAssignmentModalContainer from './WorkflowAssignmentModalContainer'

function useStore() {
  const { store } = React.useContext(MobXProviderContext)
  const {
    user: {
      personalization: {
        projectPreferences
      }
    }
  } = store

  return {
    projectPreferences
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

export default observer(WorkflowAssignmentModalConnector)