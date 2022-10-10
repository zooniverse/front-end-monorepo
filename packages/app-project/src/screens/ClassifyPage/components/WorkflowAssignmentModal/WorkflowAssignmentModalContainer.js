import { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import WorkflowAssignmentModal from './WorkflowAssignmentModal'

function WorkflowAssignmentModalContainer ({
  assignedWorkflowID = '',
  currentWorkflowID = '',
  promptAssignment = () => false
}) {
  const showPrompt = useMemo(() => promptAssignment(currentWorkflowID), [currentWorkflowID, promptAssignment])
  const [ active, setActive ] = useState(showPrompt)
  const [ dismissedForSession, setDismissed ] = useState(false)

  // TODO: integrate session storage
  function onDismiss (event) {
    setDismissed(event.target.checked)
  }

  function closeFn () {
    setActive(false)
  }

  useEffect(() => {
    if (showPrompt && !dismissedForSession) {
      setActive(true)
    }

    return () => setActive(false)
  }, [assignedWorkflowID, dismissedForSession, showPrompt])

  if (assignedWorkflowID) {
    return (
      <WorkflowAssignmentModal
        active={active}
        assignedWorkflowID={assignedWorkflowID}
        closeFn={closeFn}
        dismiss={onDismiss}
        dismissedForSession={dismissedForSession}
      />
    )
  }

  return null
}

WorkflowAssignmentModalContainer.propTypes = {
  assignedWorkflowID: PropTypes.string,
  currentWorkflowID: PropTypes.string,
  promptAssignment: PropTypes.func
}

export default WorkflowAssignmentModalContainer