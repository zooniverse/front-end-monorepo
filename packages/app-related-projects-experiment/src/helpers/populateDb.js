const panoptesClient = require('./panoptesClient')
const logger = require('../logger')
const projectsModel = require('../models/projects')

async function populateDb (page = 1) {
  logger.verbose(`Fetching page ${page} of projects from Panoptes`)
  try {
    const response = await requestProjects(page)
    logger.verbose(`${response.projects.length} projects received`)

    response.projects
      .filter(project => project.tags.length > 0)
      .forEach(projectsModel.upsert)

    if (response.meta.next_page) {
      return populateDb(response.meta.next_page)
    }
  } catch (error) {
    logger.error(`Error while fetching page ${page} of projects from Panoptes`)
    logger.error(error)
    process.exit(1)
  }
}

module.exports = populateDb

async function requestProjects (page) {
  return panoptesClient.get('/projects', {
    body: {
      beta_approved: true,
      page
    }
  })
}
