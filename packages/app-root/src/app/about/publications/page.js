import { Publications } from '@zooniverse/content'

import {
  buildResponse,
  createProjectAvatarsMap,
  getProjectAvatars,
  getPublicationsData,
  getUniqueProjectIds
} from './processPublicationData.js'
import client from '../../../utils/contentfulClient.js'
import mockResponse from './response.mock.json'

export const metadata = {
  title: 'Publications',
  description: 'A list of academic publications that use Zooniverse-generated data.'
}

// This route is static, so the output of the request will be cached and revalidated as part of the route segment.
// Note that project avatars will display only when PANOPTES_ENV=production
async function createPublicationsResponse() {
  if (client) {
    try {
      const publications = await getPublicationsData()
      const projectIds = getUniqueProjectIds(publications)
      const projectAvatars = await getProjectAvatars(projectIds)
      const projectAvatarsMap = createProjectAvatarsMap(projectAvatars)
      return buildResponse(publications, projectAvatarsMap)
    } catch (error) {
      console.error(error)
      return mockResponse
    }
  } else {
    return mockResponse
  }
}

export const revalidate = 3600 // revalidate the data at most every hour

export default async function PublicationsPage() {
  const publicationsData = await createPublicationsResponse()

  // For rendering linked h2's
  publicationsData?.forEach(
    discipline =>
      (discipline.slug = discipline.title?.toLowerCase().replaceAll(' ', '-'))
  )

  // For building the sidebar
  const sections = publicationsData?.map(discipline => ({
    name: discipline.title,
    slug: discipline.title?.toLowerCase().replaceAll(' ', '-')
  }))

  return (
    <Publications publicationsData={publicationsData} sections={sections} />
  )
}
