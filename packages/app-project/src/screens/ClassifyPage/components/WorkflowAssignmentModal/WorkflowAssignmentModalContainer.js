import React from 'react'
import WorkflowAssignmentModal from './WorkflowAssignmentModal'

function WorkflowAssignmentModalContainer({ projectPreferences, workflowID }) {
  const [ active, setActive ] = React.useState(false)

  function closeFn() {
    setActive(false)
  }

  React.useEffect(() => {
    if (projectPreferences?.userHasAssignment(workflowID)) {
      setActive(true)
    }

    return () => setActive(false)
  }, [projectPreferences, workflowID])

  return (
    <WorkflowAssignmentModal
      active={active}
      closeFn={closeFn}
    />
  )
}

export default WorkflowAssignmentModalContainer