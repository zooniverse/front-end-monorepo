/**
  Sometimes an active workflow retires while a user is assigned to it,
  so we fetch the assigned workflow's config just in case.
  https://github.com/zooniverse/front-end-monorepo/issues/6198
*/
import { panoptes } from '@zooniverse/panoptes-js'
import useSWR from 'swr'

const SWRoptions = {
  revalidateIfStale: false,
  revalidateOnMount: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  refreshInterval: 0
}

async function fetchAssignedWorkflow({
  fields = 'configuration',
  assignedWorkflowID,
}) {
  const query = {
    fields,
    id: assignedWorkflowID
  }
  const response = await panoptes.get('/workflows', query)
  if (response.ok && response.body.workflows?.length) {
    const fetchedWorkflow = response.body.workflows[0]
    return parseInt(fetchedWorkflow?.configuration?.level, 10)
  }
  return 1
}

function useAssignedLevel(assignedWorkflowID, workflows = []) {
  const existingWorkflow = workflows.find(workflow => workflow.id === assignedWorkflowID)
  const defaultWorkflowLevel = existingWorkflow?.configuration?.level
    ? parseInt(existingWorkflow.configuration.level, 10)
    : 1
  const key = !existingWorkflow && assignedWorkflowID
    ? { assignedWorkflowID }
    : null // skip data fetching when we already have the workflow level
    const { data: fetchedWorkflowLevel } = useSWR(key, fetchAssignedWorkflow, SWRoptions)

  return fetchedWorkflowLevel || defaultWorkflowLevel
}

export default useAssignedLevel
