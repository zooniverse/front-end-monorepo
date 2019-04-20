const projectsModel = require('../models/projects')
const getProjectProperties = require('./getProjectProperties')
const panoptesClient = require('./panoptesClient')

async function populateDb (page = 1) {
  const response = await requestProjects(page)

  const filteredProjects = response.projects
    .filter(project => project.tags.length > 0)
    .forEach(project => projectsModel.upsert(project))

  if (response.meta.next_page) {
    return populateDb(response.meta.next_page)
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
