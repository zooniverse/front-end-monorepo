import React from 'react'
import WorkflowAssignmentModal from './WorkflowAssignmentModal'

function WorkflowAssignmentModalContainer({ projectPreferences, workflowID }) {
  const [ active, setActive ] = React.useState(false)
  const [ dismissedForSession, setDismissed ] = React.useState(false)

  // TODO: integrate session storage
  function onDismiss(event) {
    setDismissed(event.target.checked)
  }

  function closeFn() {
    setActive(false)
  }

  React.useEffect(() => {
    if (projectPreferences?.userHasAssignment(workflowID)) {
      if (!dismissedForSession) setActive(true)
    }

    return () => setActive(false)
  }, [projectPreferences, workflowID])

  return (
    <WorkflowAssignmentModal
      active={active}
      closeFn={closeFn}
      dismiss={onDismiss}
      dismissedForSession={dismissedForSession}
    />
  )
}

export default WorkflowAssignmentModalContainer