const get = require('lodash/get')

const getProjectProperties = require('./getProjectProperties')
const panoptesClient = require('./panoptesClient')
const projectsModel = require('../models/projects')

async function getTargetProject (id) {
  // Returns `null` if no project found
  let project = projectsModel.getById(id)

  if (!project) {
    const result = await panoptesClient.get(`/projects/${id}`)
    const projectFromResponse = get(result, 'projects[0]')
    if (projectFromResponse) {
      project = getProjectProperties(projectFromResponse)
    }
  }

  return project
}

module.exports = getTargetProject
