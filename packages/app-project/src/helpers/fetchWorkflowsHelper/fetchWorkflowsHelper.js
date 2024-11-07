import { panoptes } from '@zooniverse/panoptes-js'

import getServerSideAPIHost from '@helpers/getServerSideAPIHost'
import logToSentry from '@helpers/logger/logToSentry.js'

/* Helper function to fetch data for multiple workflows */
async function fetchWorkflowData(workflows, env, complete = false) {
  const { headers, host } = getServerSideAPIHost(env)
  try {
    const query = {
      complete,
      env,
      fields: 'completeness,configuration,display_name,grouped,prioritized',
      id: workflows.join(',')
    }
    const response = await panoptes.get('/workflows', query, { ...headers }, host)
    return response.body.workflows
  } catch (error) {
    logToSentry(error)
    throw error
  }
}

/* Helper function to fetch workflow data regardless of completion status */
async function fetchSingleWorkflow(workflowID, env) {
  const { headers, host } = getServerSideAPIHost(env)
  try {
    const query = {
      env,
      fields: 'completeness,configuration,display_name,grouped,prioritized',
      id: workflowID
    }
    const response = await panoptes.get('/workflows', query, { ...headers }, host)
    const [ workflow ] = response.body.workflows
    return workflow
  } catch (error) {
    logToSentry(error)
    throw error
  }
}

async function fetchDisplayNames(language, workflows, env) {
  const { headers, host } = getServerSideAPIHost(env)
  let displayNames = {}
  try {
    const query = {
      env,
      fields: 'strings,translated_id',
      language,
      'translated_id': workflows.join(','),
      'translated_type': 'workflow'
    }
    const response = await panoptes.get('/translations', query, { ...headers }, host)
    const { translations } = response.body
    displayNames = createDisplayNamesMap(translations)
  } catch (error) {
    logToSentry(error)
    throw error
  }
  return displayNames
}

/* Attach the displayName to a workflow object once it is fetched */
async function buildWorkflow(workflow, displayName) {
  const workflowData = {
    completeness: workflow.completeness || 0,
    configuration: workflow.configuration,
    displayName,
    grouped: workflow.grouped,
    id: workflow.id,
    links: workflow.links,
    prioritized: workflow.prioritized,
  }

  return workflowData
}

/* order is specified by the project owner in the lab */
function orderWorkflows(workflows, order) {
  const workflowsByID = {};
  workflows.forEach((workflow) => { workflowsByID[workflow.id] = workflow; });

  const workflowsInOrder = order.map(workflowID => workflowsByID[workflowID]).filter(Boolean);

  // Append any workflows that exist but do not appear in the order.
  workflows.forEach((workflow) => {
    if (workflowsInOrder.indexOf(workflow) === -1) {
      workflowsInOrder.push(workflow);
    }
  });

  return workflowsInOrder
}

async function fetchWorkflowsHelper(
    /* the current locale */
    language = 'en',
    /* an array of workflow IDs to fetch, usually from getStaticPageProps() */
    workflowIDs,
    /* a specific workflow ID to fetch, usually from getStaticPageProps() */
    workflowID,
    /* display order of workflow IDs, specified by the project owner in the lab. */
    workflowOrder = [],
    /* API environment, production | staging. */
    env
  ) {
  let returnedWorkflows = []

  // Fetching multiple workflows for the project pages
  // When a project has active, incomplete workflows, return those so volunteers classifies them
  const incompleteWorkflows = await fetchWorkflowData(workflowIDs, env, false)
  if (incompleteWorkflows?.length) {
    returnedWorkflows = incompleteWorkflows
  }
    
  // If `complete: false` returns zero workflows, fetch all active workflows regardless of completeness
  // so volunteers can still view the Classify page for a finished project or project out of data
  if (!incompleteWorkflows?.length) {
    const completedWorkflows = await fetchWorkflowData(workflowIDs, env, true)
    returnedWorkflows = completedWorkflows
  }

  // When a single workflowID is provided, this usually means the project has 1 active workflow
  // or the url includes is a specific workflow id
  if (workflowID) {
    const activeWorkflow = returnedWorkflows.find(workflow => workflow.id === workflowID)
    if (!activeWorkflow) {
      const workflow = await fetchSingleWorkflow(workflowID, env)
      returnedWorkflows.push(workflow)
    }
  }

  // Get the display names of each workflow for the WorkflowSelector UI depending on language
  const workflowIds = returnedWorkflows.map(workflow => workflow.id)
  const displayNames = await fetchDisplayNames(language, workflowIds, env)
  const awaitWorkflows = returnedWorkflows.map(workflow => {
    const displayName = displayNames[workflow.id] || workflow.display_name
    return buildWorkflow(workflow, displayName)
  })
  const workflowStatuses = await Promise.allSettled(awaitWorkflows)
  const workflowsWithDisplayNames = workflowStatuses.map(promiseResult => promiseResult.value || promiseResult.reason)

  // Order the workflows according to order set my project owner in the lab
  const orderedWorkflows = orderWorkflows(workflowsWithDisplayNames, workflowOrder)
  return orderedWorkflows
}

function createDisplayNamesMap(translations) {
  const map = {}
  translations.forEach(translation => {
    const workflowId = translation.translated_id.toString()
    map[workflowId] = translation.strings['display_name']
  })
  return map
}

export default fetchWorkflowsHelper
