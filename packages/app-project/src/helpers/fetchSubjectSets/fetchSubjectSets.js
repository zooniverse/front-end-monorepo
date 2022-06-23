import { panoptes } from '@zooniverse/panoptes-js'

import getServerSideAPIHost from '@helpers/getServerSideAPIHost'
import { logToSentry } from '@helpers/logger'

async function fetchSubjectSetData(subjectSetIDs, env) {
  const { headers, host } = getServerSideAPIHost(env)
  let subject_sets = []
  try {
    const query = {
      env,
      id: subjectSetIDs.join(','),
      page_size: subjectSetIDs.length
    }
    const response = await panoptes.get('/subject_sets', query, { ...headers }, host)
    subject_sets = response.body.subject_sets
    await Promise.allSettled(subject_sets.map(subjectSet => fetchPreviewImage(subjectSet, env)))
  } catch (error) {
    console.error(error)
    logToSentry(error)
  }
  return subject_sets
}

async function fetchPreviewImage (subjectSet, env) {
  const { headers, host } = getServerSideAPIHost(env)
  try {
    const query = {
      env,
      subject_set_id: subjectSet.id,
      include: 'subject',
      page_size: 1
    }
    const response = await panoptes.get('/set_member_subjects', query, { ...headers }, host)
    const { linked } = response.body
    subjectSet.subjects = linked.subjects
  } catch (error) {
    console.error(error)
    logToSentry(error)
  }
}

export default async function fetchSubjectSets(workflow, env) {
  const subjectSetIDs = workflow.links.subject_sets
  let workflowSubjectSets = []
  if (subjectSetIDs.length > 0) {
    workflowSubjectSets = await fetchSubjectSetData(subjectSetIDs, env)
  }
  return workflowSubjectSets
}
