import { MobXProviderContext, observer } from 'mobx-react'
import { useContext } from 'react'
import useAssignedLevel from '@hooks/useAssignedLevel'
import ClassifyPageContainer from './ClassifyPageContainer'

function useStore(store) {
  const {
    appLoadingState,
    project: {
      experimental_tools
    },
    user: { personalization: { projectPreferences } }
  } = store

  return {
    appLoadingState,
    projectPreferences,
    workflowAssignmentEnabled: experimental_tools.includes('workflow assignment')
  }
}

function ClassifyPageConnector(props) {
  const { store } = useContext(MobXProviderContext)
  const {
    appLoadingState,
    projectPreferences,
    workflowAssignmentEnabled = false
  } = useStore(store)
  const assignedWorkflowID = projectPreferences?.settings?.workflow_id
  const assignedWorkflowLevel = useAssignedLevel(assignedWorkflowID, props.workflows)

  return (
    <ClassifyPageContainer
      {...props}
      appLoadingState={appLoadingState}
      assignedWorkflowLevel={assignedWorkflowLevel}
      projectPreferences={projectPreferences}
      workflowAssignmentEnabled={workflowAssignmentEnabled}
    />
  )
}

export default observer(ClassifyPageConnector)
