import { projects } from '@zooniverse/panoptes-js'

import buildResponse from './buildResponse'
import getUniqueProjectIds from './getUniqueProjectIds'
import cache from './publicationsCache'
import client from '../shared/contentfulClient'

export default async function handle(req, res) {
  try {
    const data = await cache.get('publications', createPublicationsResponse)
    res.json(data)
  } catch (error) {
    console.info(error)
    res.status(500).json({
      error: 'Error fetching data from Contentful'
    })
  }
}

async function createPublicationsResponse () {
  const publications = await getPublicationsData()
  const projectIds = getUniqueProjectIds(publications)
  const projectAvatars = await getProjectAvatars(projectIds)
  const projectAvatarsMap = createProjectAvatarsMap(projectAvatars)
  return buildResponse(publications, projectAvatarsMap)
}

async function getPublicationsData (skip = 0, limit = 100, accumulator = []) {
  const data = await client.getEntries({
    content_type: 'publication',
    include: 2,
    limit,
    order: 'sys.createdAt',
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

async function getProjectAvatars (projectIds, page = 1, limit = 100, accumulator = []) {
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

function createProjectAvatarsMap (projectAvatars) {
  return projectAvatars.reduce((accumulator, project) => ({
    ...accumulator,
    [project.id]: project
  }), {})
}
