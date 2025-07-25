import { collections } from '@zooniverse/panoptes-js'
import auth from 'panoptes-client/lib/auth'

export async function addSubjectsToCollection({ collectionId, options, projectId, subjectIds }) {
  const token = await auth.checkBearerToken()
  const authorization = `Bearer ${token}`

  if (!collectionId) {
    const response = await collections.create({
      authorization,
      data: options,
      project: projectId,
      subjects: subjectIds
    })

    const [newCollection] = response.body.collections
    return newCollection
  } else {
    const params = {
      authorization,
      id: collectionId,
      subjects: subjectIds
    }

    const response = await collections.addSubjects(params)
    const [collection] = response?.body?.collections
    return collection
  }
}
