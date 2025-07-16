import { collections } from '@zooniverse/panoptes-js'

export async function addSubjectsToCollection(key,
  { arg: { collectionId, options, subjectIds } }
) {
  const { token } = key
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
