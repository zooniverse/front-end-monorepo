import { panoptes } from '@zooniverse/panoptes-js'

import { logToSentry } from '@helpers/logger'
import fetchSubjectSets from '@helpers/fetchSubjectSets'

async function fetchWorkflowData (activeWorkflows, env) {
  try {
    const query = {
      complete: false,
      env,
      fields: 'completeness,configuration,display_name,grouped',
      id: activeWorkflows.join(',')
    }
    const response = await panoptes.get('/workflows', query)
    return response.body.workflows
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
    subjectSets: []
  }
  if (workflow.grouped) {
    workflowData.subjectSets = await fetchSubjectSets(workflow, env)
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

async function fetchWorkflowsHelper(language = 'en', activeWorkflows, defaultWorkflow, workflowOrder = [], env) {
  const workflows = await fetchWorkflowData(activeWorkflows, env)
  const workflowIds = workflows.map(workflow => workflow.id)
  const displayNames = await fetchDisplayNames(language, workflowIds, env)

  const awaitWorkflows = workflows.map(workflow => {
    const isDefault = workflows.length === 1 || workflow.id === defaultWorkflow
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
