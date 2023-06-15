import { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { MobXProviderContext, observer } from 'mobx-react'

import WorkflowAssignmentModal from './WorkflowAssignmentModal'

function useStore() {
  const { store } = useContext(MobXProviderContext)

  return {
    assignedWorkflowID: store.user.personalization.projectPreferences.settings?.workflow_id,
    promptAssignment: store.user.personalization.projectPreferences.promptAssignment
  }
}

function WorkflowAssignmentModalContainer({ currentWorkflowID = '' }) {
  const { assignedWorkflowID, promptAssignment } = useStore()

  const [active, setActive] = useState(false)
  const [dismissedForSession, setDismissed] = useState(false)

  useEffect(function checkForDismissal() {
    if (window.sessionStorage.getItem('workflowAssignmentModalDismissed')) {
        setDismissed(true)
      } else {
        setDismissed(false)
      }
  }, [])

  useEffect(function modalVisibility() {
    /** Wait for the screen to load before checking for assignedWorkflowID */
      const showPrompt = promptAssignment(currentWorkflowID)
      if (showPrompt && !dismissedForSession) {
        setActive(true)
      }

      return () => setActive(false)
    },
    [assignedWorkflowID, dismissedForSession]
  )


  function onDismiss() {
    if (window.sessionStorage) {
      window.sessionStorage.setItem('workflowAssignmentModalDismissed', 'true')
    }
  }

  function closeFn() {
    setActive(false)
  }

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
  currentWorkflowID: PropTypes.string
}

export default observer(WorkflowAssignmentModalContainer)
