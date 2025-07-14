import { collections } from '@zooniverse/panoptes-js'

export async function removeSubjectsFromCollection(key,
  { arg: { collectionId, subjectIds } }
) {
  const { token } = key
  const authorization = `Bearer ${token}`
  const params = {
    authorization,
    id: collectionId,
    subjects: subjectIds
  }

  const response = await collections.removeSubjects(params)

  if (response?.status === 204) {
    return [{
      id: collectionId,
      links: { subjects: subjectIds }
    }]
  }

  throw new Error('Unexpected response from removeSubjects')
}
