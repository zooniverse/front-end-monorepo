/**
  Sometimes an active workflow retires while a user is assigned to it,
  so we fetch the assigned workflow's config just in case.
  https://github.com/zooniverse/front-end-monorepo/issues/6198
*/

import { useEffect, useState } from 'react'
import { panoptes } from '@zooniverse/panoptes-js'

function useAssignedLevel(assignedWorkflowID) {
  const [assignedWorkflowLevel, setAssignedWorkflowLevel] = useState(1)

  async function checkAssignedLevel() {
    const query = {
      fields: 'configuration',
      id: assignedWorkflowID
    }
    try {
      const response = await panoptes.get('/workflows', query)
      if (response.ok) {
        const fetchedWorkflow = response.body.workflows?.[0]
        setAssignedWorkflowLevel(parseInt(fetchedWorkflow?.configuration?.level), 10)
      }
    } catch (error) {
      throw error
    }
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
