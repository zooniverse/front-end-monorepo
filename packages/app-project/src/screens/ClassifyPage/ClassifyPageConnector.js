import { MobXProviderContext, observer } from 'mobx-react'
import { useRouter } from 'next/router'
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

function ClassifyPageConnector({
  // workflow ID from the page URL
  workflowID,
  ...props
}) {
  const router = useRouter()
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

  // store the workflow from the URL, if it isn't already stored
  if (workflowID && workflowID !== defaultWorkflow) {
    setSelectedWorkflow(workflowID)
  }

  // client-side redirect if there's no workflow in the URL
  if (!workflowID && defaultWorkflow) {
    const newPath = router.asPath.replace('/classify', `/classify/workflow/${defaultWorkflow}`)
    router.replace(newPath, newPath, { shallow: true })
  }

  return (
    <ClassifyPageContainer
      {...props}
      appLoadingState={appLoadingState}
      assignedWorkflowLevel={assignedWorkflowLevel}
      projectPreferences={projectPreferences}
      workflowAssignmentEnabled={workflowAssignmentEnabled}
      workflowID={workflowID || defaultWorkflow}
    />
  )
}

export default observer(ClassifyPageConnector)
