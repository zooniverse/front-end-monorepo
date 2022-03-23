import useSWR from 'swr'

import { panoptes } from '@zooniverse/panoptes-js'

const SWRoptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

async function fetchWorkflow(workflowID) {
  if (workflowID) {
    const { body } = await panoptes.get(`/workflows/${workflowID}`)
    const [ workflowSnapshot ] = body.workflows
    return workflowSnapshot
  }
  return null
}

export default function useWorkflowSnapshot(workflowID) {
  const { data } = useSWR(workflowID, fetchWorkflow, SWRoptions)
  return data ?? null
}
