import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import WorkflowAssignmentModal from './WorkflowAssignmentModal'

function WorkflowAssignmentModalContainer (props) {
  const {
    assignedWorkflowID = '',
    currentWorkflowID = '',
    promptAssignment = () => { }
  } = props
  const [ active, setActive ] = useState(false)
  const [ dismissedForSession, setDismissed ] = useState(false)

  // TODO: integrate session storage
  function onDismiss (event) {
    setDismissed(event.target.checked)
  }

  function closeFn () {
    setActive(false)
  }

  useEffect(() => {
    if (promptAssignment(currentWorkflowID)) {
      if (!dismissedForSession) setActive(true)
    }

    return () => setActive(false)
  }, [assignedWorkflowID, currentWorkflowID])

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