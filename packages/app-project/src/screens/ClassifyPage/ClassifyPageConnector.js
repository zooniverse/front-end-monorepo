import { MobXProviderContext, observer } from 'mobx-react'
import { useContext } from 'react'
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

  return (
    <ClassifyPageContainer
      appLoadingState={appLoadingState}
      assignedWorkflowID={projectPreferences?.settings?.workflow_id}
      projectPreferences={projectPreferences}
      workflowAssignmentEnabled={workflowAssignmentEnabled}
      {...props}
    />
  )
}

export default observer(ClassifyPageConnector)
