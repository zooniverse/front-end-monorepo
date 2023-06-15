import { useContext, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { MobXProviderContext, observer } from 'mobx-react'

import WorkflowAssignmentModal from './WorkflowAssignmentModal'

const DEFAULT_HANDLER = () => true

function useStore() {
  const { store } = useContext(MobXProviderContext)

  return {
    assignedWorkflowID: store.user.personalization.projectPreferences.settings?.workflow_id,
    promptAssignment: store.user.personalization.projectPreferences.promptAssignment
  }
}

function WorkflowAssignmentModalContainer({ currentWorkflowID = '' }) {
  const { assignedWorkflowID = '', promptAssignment = DEFAULT_HANDLER } = useStore()

  const showPrompt = useMemo(
    () => promptAssignment(currentWorkflowID),
    [currentWorkflowID, promptAssignment]
  )
  const [active, setActive] = useState(showPrompt)

  const dismissedForSession = window?.sessionStorage.getItem("workflowAssignmentModalDismissed")

  function onDismiss(event) {
    window?.sessionStorage.setItem("workflowAssignmentModalDismissed", true)
  }

  function closeFn() {
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

export default observer(WorkflowAssignmentModalContainer)
