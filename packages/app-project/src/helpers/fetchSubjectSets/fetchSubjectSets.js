import { panoptes } from '@zooniverse/panoptes-js'
import fetch from 'node-fetch'

import { logToSentry } from '@helpers/logger'

const subjectSetCache = {}

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
    await Promise.allSettled(subject_sets.map(subjectSet => hasIndexedSubjects(subjectSet)))
  } catch (error) {
    console.error(error)
    logToSentry(error)
  }
  return subject_sets
}

async function workflowSubjectSets(subjectSetIDs, env) {
  const workflowSubjectSets = []
  const setsToFetch = []
  subjectSetIDs.forEach(id => {
    if (subjectSetCache[id]) {
      workflowSubjectSets.push(subjectSetCache[id])
    } else {
      setsToFetch.push(id)
    }
  })
  if (setsToFetch.length > 0) {
    const newSets = await fetchSubjectSetData(setsToFetch, env)
    newSets.forEach(subjectSet => {
      workflowSubjectSets.push(subjectSet)
      subjectSetCache[subjectSet.id] = subjectSet
    })
  }
  return workflowSubjectSets
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

async function hasIndexedSubjects(subjectSet) {
  const response = await fetch(`https://subject-set-search-api.zooniverse.org/subjects/${subjectSet.id}.json`)
  const data = await response.json()
  subjectSet.isIndexed = !!data.rows
}

export default async function fetchSubjectSets(workflow, env) {
  const subjectSetCounts = await fetchWorkflowCellectStatus(workflow)
  let subjectSetIDs = Object.keys(subjectSetCounts)
  if (subjectSetIDs.length === 0) {
    subjectSetIDs = workflow.links.subject_sets
  }
  const subjectSets = await workflowSubjectSets(subjectSetIDs, env)
  subjectSets.forEach(subjectSet => {
    subjectSet.availableSubjects = subjectSetCounts[subjectSet.id]
  })
  return subjectSets
}
