import { panoptes } from '@zooniverse/panoptes-js'
import auth from 'panoptes-client/lib/auth'

async function fetchUserRecents() {
  try {
    const user = await auth.checkCurrent()
    const token = await auth.checkBearerToken()
    const authorization = `Bearer ${token}`
    const query = {
      page: 1,
      sort: '-created_at'
    }
    const response = await panoptes.get(`/users/${user.id}/recents`, query, {
      authorization
    })
    return response.body?.recents
  } catch (error) {
    console.error(error)
    return []
  }
}

async function fetchSubjectLinks(subject) {
  try {
    const response = await panoptes.get('/projects', {
      id: subject.links?.project
    })
    const slug = response.body?.projects[0].slug
    subject.slug = slug
  } catch {
    console.error(error)
  }
}

export default async function fetchRecentSubjects() {
  const subjects = await fetchUserRecents()

  if (subjects?.length) {
    await Promise.allSettled(subjects.map(fetchSubjectLinks))
  }

  return subjects
}
