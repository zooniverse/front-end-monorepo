import { panoptes } from '@zooniverse/panoptes-js'

async function fetchWorkflowData (activeWorkflows, env) {
  const response = await panoptes
    .get('/workflows', {
      complete: false,
      env,
      fields: 'completeness,grouped',
      id: activeWorkflows.join(','),
      include: 'subject_sets'
    })
  const { workflows, linked } = response.body
  const subjectSets = linked ? linked.subject_sets : []
  await Promise.allSettled(subjectSets.map(subjectSet => fetchPreviewImage(subjectSet, env)))
  return { subjectSets, workflows }
}

function fetchDisplayNames (language, activeWorkflows, env) {
  return panoptes
    .get('/translations', {
      env,
      fields: 'strings,translated_id',
      language,
      'translated_id': activeWorkflows.join(','),
      'translated_type': 'workflow'
    })
    .then(response => response.body.translations)
    .then(createDisplayNamesMap)
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

async function fetchWorkflowsHelper (language = 'en', activeWorkflows, defaultWorkflow, env) {
  const { subjectSets, workflows } = await fetchWorkflowData(activeWorkflows, env)
  const workflowIds = workflows.map(workflow => workflow.id)
  const displayNames = await fetchDisplayNames(language, workflowIds, env)

  return workflows.map(workflow => {
    const isDefault = workflows.length === 1 || workflow.id === defaultWorkflow
    const workflowSubjectSets = workflow.links.subject_sets
      .map(subjectSetID => {
        return subjectSets.find(subjectSet => subjectSet.id === subjectSetID)
      })
      .filter(Boolean)

    return {
      completeness: workflow.completeness || 0,
      default: isDefault,
      displayName: displayNames[workflow.id],
      grouped: workflow.grouped,
      id: workflow.id,
      subjectSets: workflowSubjectSets
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
