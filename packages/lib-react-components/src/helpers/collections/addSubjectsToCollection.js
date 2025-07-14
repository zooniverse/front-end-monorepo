import { collections } from '@zooniverse/panoptes-js'

export async function addSubjectsToCollection(key,
  { arg: { collectionId, subjectIds } }
) {
  const { token } = key
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
