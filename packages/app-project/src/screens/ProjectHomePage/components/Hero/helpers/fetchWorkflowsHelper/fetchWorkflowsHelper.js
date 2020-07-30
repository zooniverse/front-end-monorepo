import { panoptes } from '@zooniverse/panoptes-js'

function fetchWorkflowData (activeWorkflows) {
  return panoptes
    .get('/workflows', {
      complete: false,
      fields: 'completeness,grouped',
      id: activeWorkflows.join(',')
    })
    .then(response => response.body.workflows)
}

function fetchDisplayNames (language, activeWorkflows) {
  return panoptes
    .get('/translations', {
      fields: 'strings,translated_id',
      language,
      'translated_id': activeWorkflows.join(','),
      'translated_type': 'workflow'
    })
    .then(response => response.body.translations)
    .then(createDisplayNamesMap)
}

async function fetchWorkflowsHelper (language = 'en', activeWorkflows, defaultWorkflow) {
  const workflows = await fetchWorkflowData(activeWorkflows)
  const workflowIds = workflows.map(workflow => workflow.id)
  const displayNames = await fetchDisplayNames(language, workflowIds)

  return workflows.map(workflow => {
    const isDefault = workflows.length === 1 || workflow.id === defaultWorkflow

    return {
      completeness: workflow.completeness || 0,
      default: isDefault,
      displayName: displayNames[workflow.id],
      grouped: workflow.grouped,
      id: workflow.id,
      subjectSets: workflow.links.subject_sets
    }
  })
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
