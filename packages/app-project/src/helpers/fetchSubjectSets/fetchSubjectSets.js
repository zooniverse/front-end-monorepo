import { panoptes } from '@zooniverse/panoptes-js'

import { logToSentry } from '@helpers/logger'

async function fetchSubjectSetData(subjectSetIDs, env) {
  let subject_sets = []
  try {
    const query = {
      env,
      id: subjectSetIDs.join(','),
      page_size: subjectSetIDs.length
    }
    const response = await panoptes.get('/subject_sets', query)
    subject_sets = response.body.subject_sets
    await Promise.allSettled(subject_sets.map(subjectSet => fetchPreviewImage(subjectSet, env)))
    await Promise.allSettled(subject_sets.map(subjectSet => hasIndexedSubjects(subjectSet)))
  } catch (error) {
    console.error(error)
    logToSentry(error)
  }
  return subject_sets
}

async function fetchPreviewImage (subjectSet, env) {
  try {
    const response = await panoptes
      .get('/set_member_subjects', {
        env,
        subject_set_id: subjectSet.id,
        include: 'subject',
        page_size: 1
      })
    const { linked } = response.body
    subjectSet.subjects = linked.subjects
  } catch (error) {
    console.error(error)
    logToSentry(error)
  }
}

async function hasIndexedSubjects(subjectSet) {
  const response = await fetch(`https://subject-set-search-api.zooniverse.org/subjects/${subjectSet.id}.json`)
  const data = await response.json()
  subjectSet.isIndexed = !!data.rows
}

export default async function fetchSubjectSets(workflow, env) {
  const subjectSetIDs = workflow.links.subject_sets
  let workflowSubjectSets = []
  if (subjectSetIDs.length > 0) {
    workflowSubjectSets = await fetchSubjectSetData(subjectSetIDs, env)
  }
  return workflowSubjectSets
}
