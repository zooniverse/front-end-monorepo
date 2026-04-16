import { panoptes } from '@zooniverse/panoptes-js'

import getServerSideAPIHost from '@helpers/getServerSideAPIHost'
import logToSentry from '@helpers/logger/logToSentry.js'
import { fetchDisplayNames } from '../fetchWorkflowsHelper/fetchWorkflowsHelper'

/**
 * Similar to fetchWorkflowsHelper, but paired down to only data ncessary for
 * this page along with a few extra stats properties per workflow resource.
 */

async function fetchWorkflowStats(workflows, env) {
  const { headers, host } = getServerSideAPIHost(env)
  try {
    const query = {
      env,
      fields: 'completeness,configuration,display_name,grouped,prioritized,retirement,retired_set_member_subjects_count,subjects_count',
      id: workflows.join(',')
    }
    const response = await panoptes.get('/workflows', query, { ...headers }, host)
    return response.body.workflows
  } catch (error) {
    logToSentry(error)
    throw error
  }
}

async function fetchWorkflowStatsHelper(
  language = 'en',
  workflowIDs,
  env
) {
  const workflows = await fetchWorkflowStats(workflowIDs, env, false)
  const filteredWorkflows = workflows.filter(workflow => workflow.configuration?.stats_hidden !== true)

  // Get the display names of each workflow for the UI depending on locale
  const displayNames = await fetchDisplayNames(language, workflowIDs, env)
  const awaitWorkflows = filteredWorkflows.map(workflow => {
    const displayName = displayNames[workflow.id] || workflow.display_name
    const workflowWithName = {
      ...workflow,
      displayName
    }
    return workflowWithName
  })
  const workflowStatuses = await Promise.allSettled(awaitWorkflows)
  const workflowsWithDisplayNames = workflowStatuses.map(
    promiseResult => promiseResult.value || promiseResult.reason
  )

  return workflowsWithDisplayNames
}

export default fetchWorkflowStatsHelper
