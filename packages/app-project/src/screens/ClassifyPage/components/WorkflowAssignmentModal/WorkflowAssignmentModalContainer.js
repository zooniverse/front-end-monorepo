import { PropTypes } from 'mobx-react'
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
    if (projectPreferences?.promptAssignment(workflowID)) {
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

WorkflowAssignmentModalContainer.propTypes = {
  projectPreferences: PropTypes.shape({
    promptAssignment: PropTypes.func
  }),
  workflowID: PropTypes.string
}

export default WorkflowAssignmentModalContainer