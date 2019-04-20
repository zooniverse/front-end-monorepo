const db = require('../db')
const getProjectProperties = require('../helpers/getProjectProperties')
const logger = require('../logger')

const projects = db.get('projects')

function count () {
  const count = projects
    .size()
    .value()
  logger.silly(`Counting projects in database: ${count}`)
  return count
}

function getById (id) {
  logger.silly(`Finding project ${id} in database`)
  return projects
    .find({ id })
    .cloneDeep()
    .value()
}

function getAll () {
  logger.silly(`Getting all projects from database`)
  return projects
    .cloneDeep()
    .value()
}

function upsert (record) {
  logger.silly(`Upserting project ${record.id} in database, ${record}`)
  const data = getProjectProperties(record)
  const existingRecord = projects.find(data.id)

  if (existingRecord.value()) {
    logger.silly(`Updating project record ${record.id} in database`)
    existingRecord.assign(data)
      .write()
  } else {
    logger.silly(`Creating new project record ${record.id}`)
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
