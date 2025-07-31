import { collections } from '@zooniverse/panoptes-js'
import auth from 'panoptes-client/lib/auth'

export async function removeSubjectsFromCollection({ collectionId, subjectIds }) {
  const token = await auth.checkBearerToken()
  const authorization = `Bearer ${token}`
  
  const params = {
    authorization,
    id: collectionId,
    subjects: subjectIds
  }

  const response = await collections.removeSubjects(params)

  if (response?.status === 204) {
    return { id: collectionId }
  }

  throw new Error('Unexpected response from removeSubjects')
}
