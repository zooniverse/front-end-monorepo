import WorkflowAssignmentModalContainer from './WorkflowAssignmentModalContainer'
import asyncStates from '@zooniverse/async-states'

export default {
  title: 'Project App / Screens / Classify / Workflow Assignment / Assignment Modal',
  component: WorkflowAssignmentModalContainer
}

export function Default() {
  return (
    <WorkflowAssignmentModalContainer
      assignedWorkflowID='1234'
      currentWorkflowID='5678'
      loadingState={asyncStates.success}
      promptAssignment={() => true}
    />
  )
}
