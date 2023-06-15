import WorkflowAssignmentModal from './WorkflowAssignmentModal.js'

export default {
  title:
    'Project App / Screens / Classify / Workflow Assignment / Assignment Modal',
  component: WorkflowAssignmentModal,
  args: {
    active: true,
    assignedWorkflowID: '1234',
    closeFn: () => true,
    dismiss: () => true
  }
}

const router = {
  asPath: '/foo/bar',
  query: {
    owner: 'foo',
    project: 'bar'
  }
}

export const Default = ({ active, assignedWorkflowID, closeFn, dismiss }) => {
  return (
    <WorkflowAssignmentModal
      active={active}
      assignedWorkflowID={assignedWorkflowID}
      closeFn={closeFn}
      dismiss={dismiss}
      router={router}
    />
  )
}
