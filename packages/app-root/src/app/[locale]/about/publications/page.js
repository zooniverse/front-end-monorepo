import { Publications } from '@zooniverse/content'

import {
  buildResponse,
  createProjectAvatarsMap,
  getProjectAvatars,
  getPublicationsData,
  getUniqueProjectIds
} from './processPublicationData.js'
import client from '@/utils/contentfulClient.js'
import mockResponse from './response.mock.json'

export const metadata = {
  title: 'Publications',
  description: 'A list of academic publications that use Zooniverse-generated data.'
}

// Force this route segment to be statically generated even though part of its route is the dynamic [locale].
export const dynamic = 'force-static'
export const revalidate = 3600 // revalidate the page build at most every hour

// Return a list of `params` to populate the [locale] dynamic segment and prerender this page.
// Because locale switching isn't enabled yet in the UI, just statically render 'en' route for now.
export async function generateStaticParams() {
  return [{ locale: 'en' }]
}

// If the `locale` param !== 'en', generate the page at runtime.
// This might be refactored in the future when upgrading to Next.js 16
// and/or launching locale switching on app-root pages.
export const dynamicParams = true

// This route is static, so the output of the request will be cached and revalidated as part of the route segment.
// Note that project avatars will display only when PANOPTES_ENV=production.
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
