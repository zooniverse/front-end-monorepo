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
  title: 'Our Team',
  description: 'The people who make the Zooniverse'
}

// This route is static, so the output of the request will be cached and revalidated as part of the route segment.
async function createPublicationsResponse() {
  if (client) {
    const publications = await getPublicationsData()
    const projectIds = getUniqueProjectIds(publications)
    const projectAvatars = await getProjectAvatars(projectIds)
    const projectAvatarsMap = createProjectAvatarsMap(projectAvatars)
    return buildResponse(publications, projectAvatarsMap)
  } else {
    return mockResponse
  }
}

export const revalidate = 3600 // revalidate the data at most every hour

export default async function PublicationsPage() {
  const publicationsData = await createPublicationsResponse()

  // For rendering linked h2's
  publicationsData?.forEach(
    category =>
      (category.slug = category.title.toLowerCase().replaceAll(' ', '-'))
  )

  // For building the sidebar
  const sections = publicationsData?.map(category => ({
    name: category.title,
    slug: category.title.toLowerCase().replaceAll(' ', '-')
  }))

  return (
    <Publications publicationsData={publicationsData} sections={sections} />
  )
}
