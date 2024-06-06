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

/* Anatomy of a classification object */
// [
//   {
//     id: "258337208",
//     links: {
//       project: "19072",
//       workflow: "22152",
//       subject: "80286011"
//     },
//     ...
//   },
// ...
// ]

async function fetchSubjectLinks(classification) {
  try {
    const response = await panoptes.get('/projects', {
      id: classification.links?.project
    })
    const slug = response.body?.projects[0].slug
    classification.slug = slug
  } catch {
    console.error(error)
  }
}

export default async function fetchRecentSubjects() {
  const recents = await fetchUserRecents()

  if (recents?.length) {
    await Promise.allSettled(recents.map(fetchSubjectLinks))
  }

  return recents
}
