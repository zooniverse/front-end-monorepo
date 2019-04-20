const db = require('../db')
const getProjectProperties = require('../helpers/getProjectProperties')

const projects = db.get('projects')

function count () {
  return projects
    .size()
    .value()
}

function getById (id) {
  return projects
    .find({ id })
    .cloneDeep()
    .value()
}

function getAll () {
  return projects
    .cloneDeep()
    .value()
}

function upsert (project) {
  const data = getProjectProperties(project)
  const existingRecord = projects.find(data.id)

  if (existingRecord.value()) {
    existingRecord.assign(data)
      .write()
  } else {
    projects.push(data)
      .write()
  }
}

module.exports = {
  count,
  getById,
  getAll,
  upsert
}
