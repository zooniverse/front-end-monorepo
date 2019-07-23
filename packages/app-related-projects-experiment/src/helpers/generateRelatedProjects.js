const sortByMatchingTags = require('../helpers/sortByMatchingTags')
const projectsModel = require('../models/projects')

function generateRelatedProjects (targetProject) {
  return projectsModel.getAll()
    .filter(record => record.id !== targetProject.id)
    .sort((a, b) => sortByMatchingTags(a, b, targetProject))
    .slice(0, 3)
    .map(relatedProject => relatedProject.id)
}

module.exports = generateRelatedProjects
