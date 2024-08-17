/**
  Sometimes an active workflow retires while a user is assigned to it,
  so we fetch the assigned workflow's config just in case.
  https://github.com/zooniverse/front-end-monorepo/issues/6198
*/

import { useEffect, useState } from 'react'
import { panoptes } from '@zooniverse/panoptes-js'
import useSWR from 'swr'

const SWRoptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

async function fetchAssignedWorkflow({
  fields = 'configuration',
  assignedWorkflowID
}) {
  const query = {
    fields,
    id: assignedWorkflowID
  }
  const response = await panoptes.get('/workflows', query)
  if (response.ok) {
    const fetchedWorkflow = response.body.workflows?.[0]
    return parseInt(fetchedWorkflow?.configuration?.level, 10)
  }
  return 1
}

function useAssignedLevel(assignedWorkflowID) {
  const key = assignedWorkflowID ? { assignedWorkflowID } : null
  const { data: assignedWorkflowLevel } = useSWR(key, fetchAssignedWorkflow, SWRoptions)

  return assignedWorkflowLevel || 1
}

export default useAssignedLevel
