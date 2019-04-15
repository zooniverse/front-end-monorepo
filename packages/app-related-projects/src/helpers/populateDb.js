const collectionModel = require('../models/collection')
const getProjectProperties = require('./getProjectProperties')
const panoptesClient = require('./panoptesClient')

async function populateDb (page = 1) {
  const response = await requestProjects(page)

  const filteredProjects = response.projects
    .map(getProjectProperties)
    .filter(project => project.tags.length > 0)

  collectionModel.insert(filteredProjects)

  if (response.meta.next_page) {
    return populateDb(response.meta.next_page)
  }
}

module.exports = populateDb

async function requestProjects (page = 1) {
  return panoptesClient.get('/projects', {
    body: {
      beta_approved: true,
      page
    }
  })
}
