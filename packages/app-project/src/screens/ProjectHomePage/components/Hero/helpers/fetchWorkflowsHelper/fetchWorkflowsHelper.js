import { panoptes } from '@zooniverse/panoptes-js'

async function fetchWorkflowData (activeWorkflows) {
  const response = await panoptes
    .get('/workflows', {
      complete: false,
      fields: 'completeness,grouped',
      id: activeWorkflows.join(','),
      include: 'subject_sets'
    })
  const { workflows, linked } = response.body
  const subjectSets = linked ? linked.subject_sets : []
  await Promise.allSettled(subjectSets.map(fetchPreviewImage))
  return { subjectSets, workflows }
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

async function fetchPreviewImage (subjectSet) {
  const response = await panoptes
    .get('/set_member_subjects', {
      subject_set_id: subjectSet.id,
      include: 'subject',
      page_size: 1
    })
  const { linked } = response.body
  subjectSet.subjects = linked.subjects
}

async function fetchWorkflowsHelper (language = 'en', activeWorkflows, defaultWorkflow) {
  const { subjectSets, workflows } = await fetchWorkflowData(activeWorkflows)
  const workflowIds = workflows.map(workflow => workflow.id)
  const displayNames = await fetchDisplayNames(language, workflowIds)

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
