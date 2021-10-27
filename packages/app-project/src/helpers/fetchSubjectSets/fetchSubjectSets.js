import { panoptes } from '@zooniverse/panoptes-js'
import fetch from 'node-fetch'

import { logToSentry } from '@helpers/logger'

function cacheExpiry(ttl = 60) {
  return Date.now() + ttl * 1000
}

const subjectSetCache = { expiry: cacheExpiry() }
console.log('THIS IS THE SUBJECT SET CACHE:')
console.log(subjectSetCache)
console.log('--------------')

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
  // check if the cache is expired and we should refetch API data
  const cacheExpired = subjectSetCache.expiry <= Date.now()
  subjectSetIDs.forEach(id => {
    if (!cacheExpired && subjectSetCache[id]) {
      const workflowSubjectSet = Object.assign({}, subjectSetCache[id])
      console.log('fetching subject set from cache: ' + workflowSubjectSet.id)
      workflowSubjectSets.push(workflowSubjectSet)
    } else {
      console.log('fetching subject set from API: ' + id)
      setsToFetch.push(id)
    }
  })
  // reset the caches expiry time for next lookup
  if (cacheExpired) subjectSetCache.expiry = cacheExpiry()

  if (setsToFetch.length > 0) {
    const newSets = await fetchSubjectSetData(setsToFetch, env)
    newSets.forEach(subjectSet => {
      workflowSubjectSets.push(subjectSet)
      subjectSetCache[subjectSet.id] = subjectSet
    })
  }
  return workflowSubjectSets
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
  const subjectSets = await workflowSubjectSets(subjectSetIDs, env)
  return subjectSets
}
