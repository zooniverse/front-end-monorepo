import { panoptes } from '@zooniverse/panoptes-js'
import fetch from 'node-fetch'

import { logToSentry } from '@helpers/logger'

async function fetchWorkflowData (activeWorkflows, env) {
  try {
    const query = {
      complete: false,
      env,
      fields: 'completeness,display_name,grouped',
      id: activeWorkflows.join(',')
    }
    const response = await panoptes.get('/workflows', query)
    return response.body.workflows
  } catch (error) {
    logToSentry(error)
    throw error
  }
}

async function fetchSubjectSetData(subjectSetIDs, env) {
  let subject_sets = []
  try {
    const query = {
      env,
      id: subjectSetIDs.join(',')
    }
    const response = await panoptes.get('/subject_sets', query)
    subject_sets = response.body.subject_sets
    await Promise.allSettled(subject_sets.map(subjectSet => fetchPreviewImage(subjectSet, env)))
  } catch (error) {
    console.error(error)
    logToSentry(error)
  }
  return subject_sets
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

async function fetchWorkflowCellectStatus(workflow) {
  let groups = {}
  if (workflow.grouped) {
    try {
      const workflowURL = `https://cellect.zooniverse.org/workflows/${workflow.id}/status`
      const response = await fetch(workflowURL)
      const body = await response.json()
      groups = body.groups ?? {}
    } catch (error) {
      console.error(error)
      logToSentry(error)
    }
  }
  return groups
}

async function fetchPreviewImage (subjectSet, env) {
  const response = await panoptes
    .get('/set_member_subjects', {
      env,
      subject_set_id: subjectSet.id,
      include: 'subject',
      page_size: 1
    })
  const { linked } = response.body
  subjectSet.subjects = linked.subjects
}

async function workflowSubjectSets(workflow, env) {
  const subjectSetCounts = await fetchWorkflowCellectStatus(workflow)
  const subjectSetIDs = Object.keys(subjectSetCounts)
  const subjectSets = await fetchSubjectSetData(subjectSetIDs, env)
  subjectSets.forEach(subjectSet => {
    subjectSet.availableSubjects = subjectSetCounts[subjectSet.id]
  })
  return subjectSets
}

async function buildWorkflow(workflow, displayName, isDefault, env) {
  const workflowData = {
    completeness: workflow.completeness || 0,
    default: isDefault,
    displayName,
    grouped: workflow.grouped,
    id: workflow.id,
    subjectSets: []
  }
  if (workflow.grouped) {
    workflowData.subjectSets = await workflowSubjectSets(workflow, env)
  }

  return workflowData
}

async function fetchWorkflowsHelper (language = 'en', activeWorkflows, defaultWorkflow, env) {
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
  return workflowsWithSubjectSets
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
