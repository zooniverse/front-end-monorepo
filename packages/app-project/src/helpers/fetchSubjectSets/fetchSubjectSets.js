import { panoptes } from '@zooniverse/panoptes-js'
import fetch from 'node-fetch'

import { logToSentry } from '@helpers/logger'

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

export default async function workflowSubjectSets(workflow, env) {
  const subjectSetCounts = await fetchWorkflowCellectStatus(workflow)
  const subjectSetIDs = Object.keys(subjectSetCounts)
  const subjectSets = await fetchSubjectSetData(subjectSetIDs, env)
  subjectSets.forEach(subjectSet => {
    subjectSet.availableSubjects = subjectSetCounts[subjectSet.id]
  })
  return subjectSets
}

