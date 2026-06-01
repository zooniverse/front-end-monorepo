import { panoptes } from '@zooniverse/panoptes-js'

import getServerSideAPIHost from '@helpers/getServerSideAPIHost'
import logToSentry from '@helpers/logger/logToSentry.js'
import { fetchDisplayNames } from '../fetchWorkflowsHelper/fetchWorkflowsHelper'

/**
 * Similar to fetchWorkflowsHelper, but paired down to only data necessary for
 * this page along with a few extra stats properties per workflow resource.
 */

async function fetchWorkflowData(workflowIDs, env) {
  const { headers, host } = getServerSideAPIHost(env)
  let workflowsAccumulator = []

  async function getWorkflows(page = 1) {
    try {
      const query = {
        env,
        fields:
          'classifications_count,completeness,configuration,display_name,grouped,prioritized,retirement,retired_set_member_subjects_count,subjects_count',
        id: workflowIDs.join(','),
        page
      }
      const response = await panoptes.get('/workflows', query, { ...headers }, host)

      const { meta, workflows } = response?.body || {}

      if (workflows?.length) {
        workflowsAccumulator = workflowsAccumulator.concat(workflows)
      }

      if (meta?.workflows?.next_page) {
        return getWorkflows(meta.workflows.next_page)
      }

      return workflowsAccumulator
    } catch (error) {
      logToSentry(error)
      throw error
    }
  }

  await getWorkflows(1)
  return workflowsAccumulator
}

function statsHost(env) {
  switch (env) {
    case 'production':
      return 'https://eras.zooniverse.org'
    default:
      return 'https://eras-staging.zooniverse.org'
  }
}

/* Theoretically ERAS stats data can be fetched for more than one workflow at a time, but
the response combines count all together per day, and we need separation to calc ETC per workflow */
async function fetchWorkflowClassificationStats(workflowID, env) {
  const host = statsHost(env)

  const today = new Date()

  // Subtract one day because today's stats bucket is still accumulating
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  const endDate = yesterday.toISOString().substring(0, 10)

  // Get date of two weeks ago
  const twoWeeksAgo = new Date(today)
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14)
  const startDate = twoWeeksAgo.toISOString().substring(0, 10)

  try {
    const statsResponse = await fetch(
      `${host}/classifications?period=day&workflow_id=${workflowID}&start_date=${startDate}&end_date=${endDate}`
    )
    const data = await statsResponse.json()
    return data
  } catch (error) {
    console.log(error)
    return null
  }
}

/**
 * Calculating estimated time to completion (ETC). See original PFE file https://github.com/zooniverse/Panoptes-Front-End/blob/ed9c64d698e0f846bd3b998383dbe785f6247594/app/pages/project/stats/stats.jsx#L231
 * Returns estimate number of days based on ERAS query excluding the current day because it's not over yet.
 */
function calcDaysToCompletion(erasData, workflow) {
  if (workflow.completeness === 1) return 0

  let numDays = undefined

  // This is the number of subjects in the subject set(s) attached to the workflow
  // multiplied by the number of classifications required to retire a subject
  const totalCount = workflow.subjects_count * workflow.retirement.options.count

  const dataLength = erasData.length // number of days the workflow has stats for

  if (dataLength > 1) {
    const classificationCountsArray = erasData.map(statObject => statObject.count)
    // Sum the classifications per day the workflow has been live (up to 14 days)
    const rate = classificationCountsArray.reduce((a, b) => a + b)

    // Estimate number of days needed to achieve the classification counts to retire remaining subjects
    numDays = Math.max(
      0,
      Math.ceil((dataLength * (totalCount - workflow.classifications_count)) / rate)
    )
  }

  return numDays
}

async function fetchWorkflowStatsHelper(language = 'en', workflowIDs, env, workflowOrder) {
  // order is specified by the project owner in the project builder. If no order specified it's [].

  // include only the active workflow ids
  let workflowIDsInOrder = workflowOrder.map(orderID => {
    if (workflowIDs.find(activeID => activeID === orderID)) {
      return orderID
    }
  })

  // Append any active workflow ids that exist but do not appear in the order
  workflowIDs.forEach(id => {
    if (workflowOrder.indexOf(id) === -1) {
      workflowIDsInOrder.push(id)
    }
  })

  // Note that the LevelingUpButtons also sort / filter active workflows in that UI.
  // This helper function only reads the workflow order determined in the project builder.
  // Have the project owner order the workflows in the project builder as they'd like.

  // Fetch workflow data from Panoptes API
  const workflows = await fetchWorkflowData(workflowIDsInOrder, env)

  // Workflows can be hidden via "show on stats page" checkbox in the project builder
  const filteredWorkflows = workflows.filter(
    workflow => workflow.configuration?.stats_hidden !== true
  )

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
  // maybe could combine with Promise.allSettled above
  const awaitedWorkflows = workflowsWithDisplayNames.map(async workflow => {
    const workflowERASData = await fetchWorkflowClassificationStats(workflow.id, env)

    if (workflowERASData?.data) {
      const workflowETC = calcDaysToCompletion(workflowERASData.data, workflow) || null
      const workflowWithETC = {
        ...workflow,
        etc: workflowETC
      }
      return workflowWithETC
    }
    return workflow
  })

  const workflowPromiseStatuses = await Promise.allSettled(awaitedWorkflows)
  const workflowsWithETC = workflowPromiseStatuses.map(
    promiseResult => promiseResult.value || promiseResult.reason
  )

  return workflowsWithETC
}

export default fetchWorkflowStatsHelper
