import { MobXProviderContext, observer } from 'mobx-react'
import { useContext } from 'react'
import useAssignedLevel from '@hooks/useAssignedLevel'
import ClassifyPageContainer from './ClassifyPageContainer'

function useStore(store) {
  const {
    appLoadingState,
    project: {
      experimental_tools,
      defaultWorkflow,
      setSelectedWorkflow
    },
    user: { personalization: { projectPreferences } }
  } = store

  return {
    appLoadingState,
    projectPreferences,
    defaultWorkflow,
    setSelectedWorkflow,
    workflowAssignmentEnabled: experimental_tools.includes('workflow assignment')
  }
}

function ClassifyPageConnector(props) {
  const { store } = useContext(MobXProviderContext)
  const {
    appLoadingState,
    projectPreferences,
    defaultWorkflow,
    setSelectedWorkflow,
    workflowAssignmentEnabled = false
  } = useStore(store)
  const assignedWorkflowID = projectPreferences?.settings?.workflow_id
  const assignedWorkflowLevel = useAssignedLevel(assignedWorkflowID, props.workflows)

  if (props.workflowID && props.workflowID !== defaultWorkflow) {
    setSelectedWorkflow(props.workflowID)
  }

  return (
    <ClassifyPageContainer
      {...props}
      appLoadingState={appLoadingState}
      assignedWorkflowLevel={assignedWorkflowLevel}
      projectPreferences={projectPreferences}
      workflowAssignmentEnabled={workflowAssignmentEnabled}
      workflowID={props.workflowID || defaultWorkflow}
    />
  )
}

export default observer(ClassifyPageConnector)
