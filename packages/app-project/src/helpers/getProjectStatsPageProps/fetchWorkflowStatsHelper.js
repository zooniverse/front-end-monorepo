import { panoptes } from '@zooniverse/panoptes-js'

import getServerSideAPIHost from '@helpers/getServerSideAPIHost'
import logToSentry from '@helpers/logger/logToSentry.js'
import { fetchDisplayNames } from '../fetchWorkflowsHelper/fetchWorkflowsHelper'

/**
 * Similar to fetchWorkflowsHelper, but paired down to only data ncessary for
 * this page along with a few extra stats properties per workflow resource.
 */

async function fetchWorkflowData(workflows, env) {
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

function statsHost(env) {
  switch (env) {
    case 'production':
      return 'https://eras.zooniverse.org'
    default:
      return 'https://eras-staging.zooniverse.org'
  }
}

async function fetchWorkflowClassificationStats(workflow, env) {
  const host = statsHost(env)

    try {
    const statsResponse = await fetch(`${host}/classifications?workflow_id=${workflow.id}&period=day`)
    const data = await statsResponse.json()
    return data
  } catch (error) {
    console.log(error)
    return null
  }

}

/**
 * Calculating ETC. See original PFE file
 * Returns estimate number of days based on ERAS query
 * Doesn't count the last bin returned from ERAS since the current day is not over yet
 */
function calcDaysToCompletion(erasData, workflow) {
  if (workflow.completeness === 1) return 0

  let numDays = undefined

  // This is the number of subjects in the subject set(s) attached to the workflow
  // multiplied by the number of classifications required to retire a subject
  const totalCount = workflow.subjects_count * workflow.retirement.options.count

  const dataLength = erasData.length // number of days the workflow has stats for

  if (dataLength > 1) {
    let classificationCountsArray
    let numDaysOfStats
    if (dataLength > 15) {
      classificationCountsArray = erasData.slice(dataLength - 15, dataLength - 1)
      numDaysOfStats = 14
    } else {
      classificationCountsArray = erasData.slice(0, dataLength - 1)
      numDaysOfStats = dataLength - 1
    }
    // Calculate the rate of classifications per day the workflow has been live (up to 14 days)
    const rate = classificationCountsArray.reduce((a, b) => a + b)

    // Estimate number of days needed to achieve the classification counts to retire remaining subjects
    numDays = Math.max(
      0,
      Math.ceil(
        (numDaysOfStats * (totalCount - workflow.classifications_count)) / rate
      )
    )
  }
  return numDays
}

async function fetchWorkflowStatsHelper(
  language = 'en',
  workflowIDs,
  env
) {
  const workflows = await fetchWorkflowData(workflowIDs, env)
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

  // Get the estimated time to completion per workflow and attach it the workflow object
  // turn this into multiple workflows like fetchDisplayNames
  // maybe could combine with Promise.allSettled above
  const workflowsStats = await fetchWorkflowClassificationStats(workflowIDs, env)
  const awaitedWorkflows = workflowsWithDisplayNames.map(workflow => {
    const workflowErasData = workflowsStats // filter needed and sad path safety net
    const workflowETC = calcDaysToCompletion(workflowErasData, workflow) || undefined
    const workflowWithETC = {
      ...workflow,
      ETC: workflowETC
    }
    return workflowWithETC
  })

  const workflowPromiseStatuses = await Promise.allSettled(awaitedWorkflows)
  const workflowsWithETC = workflowPromiseStatuses.map(
    promiseResult => promiseResult.value || promiseResult.reason
  )

  return workflowsWithETC
}

export default fetchWorkflowStatsHelper
