import { collections } from '@zooniverse/panoptes-js'
import auth from 'panoptes-client/lib/auth'

export async function createCollection({ options, projectId, subjectIds }) {
  const token = await auth.checkBearerToken()
  const authorization = `Bearer ${token}`

  const response = await collections.create({
    authorization,
    data: options,
    project: projectId,
    subjects: subjectIds
  })

  const [newCollection] = response.body.collections
  return newCollection
}
