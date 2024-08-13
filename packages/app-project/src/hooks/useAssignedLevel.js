/**
  Sometimes an active workflow retires while a user is assigned to it,
  so we fetch the assigned workflow's config just in case.
  https://github.com/zooniverse/front-end-monorepo/issues/6198
*/

import { useEffect, useState } from 'react'
import { fetchSingleWorkflow } from '../helpers/fetchWorkflowsHelper/fetchWorkflowsHelper'

function useAssignedLevel(assignedWorkflowID) {
  const [assignedWorkflowLevel, setAssignedWorkflowLevel] = useState(1)

  async function checkAssignedLevel() {
    const fetchedWorkflow = await fetchSingleWorkflow(
      assignedWorkflowID,
      'production'
    )
    setAssignedWorkflowLevel(fetchedWorkflow?.configuration?.level)
  }

  useEffect(
    function () {
      if (assignedWorkflowID) {
        checkAssignedLevel()
      }
    },
    [assignedWorkflowID]
  )

  return assignedWorkflowLevel
}

export default useAssignedLevel
