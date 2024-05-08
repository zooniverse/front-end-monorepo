import { projects } from '@zooniverse/panoptes-js'
import { Publications } from '@zooniverse/content'

import client from '../../../utils/contentfulClient.js'
import buildResponse from './buildResponse'
import getUniqueProjectIds from './getUniqueProjectIds'
import mockResponse from './response.mock.json'

export const metadata = {
  title: 'Our Team',
  description: 'The people who make the Zooniverse'
}

async function getPublicationsData(skip = 0, limit = 100, accumulator = []) {
  const data = await client.getEntries({
    content_type: 'publication',
    include: 2,
    limit,
    order: '-fields.year',
    skip
  })

  const newAccumulator = accumulator.concat(data.items)
  const newSkip = skip + limit
  if (data.total > newSkip) {
    return getPublicationsData(newSkip, limit, newAccumulator)
  } else {
    return newAccumulator
  }
}

async function getProjectAvatars(
  projectIds,
  page = 1,
  limit = 100,
  accumulator = []
) {
  const data = await projects
    .get({
      query: {
        cards: true,
        id: projectIds.join(','),
        page,
        page_size: limit
      }
    })
    .then(response => response.body)

  const newAccumulator = accumulator.concat(data.projects)
  const nextPage = data.meta.projects.next_page
  if (nextPage) {
    return getProjectAvatars(projectIds, nextPage, limit, newAccumulator)
  } else {
    return newAccumulator
  }
}

function createProjectAvatarsMap(projectAvatars) {
  return projectAvatars.reduce(
    (accumulator, project) => ({
      ...accumulator,
      [project.id]: project
    }),
    {}
  )
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

  return <Publications publicationsData={publicationsData} sections={sections} />
}
