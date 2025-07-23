import { collections } from '@zooniverse/panoptes-js'
import auth from 'panoptes-client/lib/auth'

import { createCollection } from './createCollection'

export async function addSubjectsToCollection({ collectionId, subjectIds }) {
  const token = await auth.checkBearerToken()
  const authorization = `Bearer ${token}`
  
  const params = {
    authorization,
    id: collectionId,
    subjects: subjectIds
  }

  const response = await collections.addSubjects(params)
  const [collection] = response?.body?.collections
  return collection
}
