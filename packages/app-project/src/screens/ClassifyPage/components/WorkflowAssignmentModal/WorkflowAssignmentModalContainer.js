import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import WorkflowAssignmentModal from './WorkflowAssignmentModal'

function WorkflowAssignmentModalContainer({ projectPreferences, currentWorkflowID }) {
  const [ active, setActive ] = useState(false)
  const [ dismissedForSession, setDismissed ] = useState(false)

  // TODO: integrate session storage
  function onDismiss(event) {
    setDismissed(event.target.checked)
  }

  function closeFn() {
    setActive(false)
  }

  useEffect(() => {
    if (projectPreferences?.promptAssignment(currentWorkflowID)) {
      if (!dismissedForSession) setActive(true)
    }

    return () => setActive(false)
  }, [projectPreferences, currentWorkflowID])

  return (
    <WorkflowAssignmentModal
      active={active}
      assignedWorkflowID={projectPreferences?.settings?.workflow_id}
      closeFn={closeFn}
      dismiss={onDismiss}
      dismissedForSession={dismissedForSession}
    />
  )
}

WorkflowAssignmentModalContainer.propTypes = {
  currentWorkflowID: PropTypes.string,
  projectPreferences: PropTypes.shape({
    promptAssignment: PropTypes.func
  })
}

export default WorkflowAssignmentModalContainer