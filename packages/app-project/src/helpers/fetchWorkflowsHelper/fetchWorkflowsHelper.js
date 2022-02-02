import { panoptes } from '@zooniverse/panoptes-js'

import { logToSentry } from '@helpers/logger'

async function fetchWorkflowData (activeWorkflows, env) {
  try {
    const query = {
      complete: false,
      env,
      fields: 'completeness,configuration,display_name,grouped,prioritized',
      id: activeWorkflows.join(',')
    }
    const response = await panoptes.get('/workflows', query)
    return response.body.workflows
  } catch (error) {
    logToSentry(error)
    throw error
  }
}

async function fetchSingleWorkflow (workflowID, env) {
  try {
    const query = {
      env,
      fields: 'completeness,configuration,display_name,grouped,prioritized',
      id: workflowID
    }
    const response = await panoptes.get('/workflows', query)
    const [ workflow ] = response.body.workflows
    return workflow
  } catch (error) {
    logToSentry(error)
    throw error
  }
}

async function fetchDisplayNames (language, activeWorkflows, env) {
  let displayNames = {}
  try {
    const response = await panoptes.get('/translations', {
      env,
      fields: 'strings,translated_id',
      language,
      'translated_id': activeWorkflows.join(','),
      'translated_type': 'workflow'
    })
    const { translations } = response.body
    displayNames = createDisplayNamesMap(translations)
  } catch (error) {
    logToSentry(error)
    throw error
  }
  return displayNames
}

async function buildWorkflow(workflow, displayName, isDefault, env) {
  const workflowData = {
    completeness: workflow.completeness || 0,
    configuration: workflow.configuration,
    default: isDefault,
    displayName,
    grouped: workflow.grouped,
    id: workflow.id,
    links: workflow.links,
    prioritized: workflow.prioritized,
    subjectSets: []
  }

  return workflowData
}

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
    /* an array of workflow IDs to fetch */
    activeWorkflowIDs,
    /* a specific workflow ID to fetch */
    workflowID,
    /* display order of workflow IDs, specified by the project owner. */
    workflowOrder = [],
    /* API environment, production | staging. */
    env
  ) {
  const activeWorkflows = await fetchWorkflowData(activeWorkflowIDs, env)
  if (workflowID) {
    const activeWorkflow = activeWorkflows.find(workflow => workflow.id === workflowID)
    if (!activeWorkflow) {
      /*
        Always fetch specified workflows, even if they're complete.
      */
      const workflow = await fetchSingleWorkflow(workflowID, env)
      activeWorkflows.push(workflow)
    }
  }
  const workflowIds = activeWorkflows.map(workflow => workflow.id)
  const displayNames = await fetchDisplayNames(language, workflowIds, env)

  const awaitWorkflows = activeWorkflows.map(workflow => {
    const isDefault = activeWorkflows.length === 1
    const displayName = displayNames[workflow.id] || workflow.display_name
    return buildWorkflow(workflow, displayName, isDefault, env)
  })
  const workflowStatuses = await Promise.allSettled(awaitWorkflows)
  const workflowsWithSubjectSets = workflowStatuses.map(result => result.value || result.reason)
  const orderedWorkflows = orderWorkflows(workflowsWithSubjectSets, workflowOrder)
  return orderedWorkflows
}

function createDisplayNamesMap (translations) {
  const map = {}
  translations.forEach(translation => {
    const workflowId = translation.translated_id.toString()
    map[workflowId] = translation.strings['display_name']
  })
  return map
}

export default fetchWorkflowsHelper
