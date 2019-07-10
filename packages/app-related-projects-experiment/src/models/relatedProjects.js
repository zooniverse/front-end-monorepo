const db = require('../db')
const logger = require('../logger')

const relatedProjects = db.get('relatedProjects')

function getById (id) {
  logger.silly(`Finding related projects for ${id}`)
  return relatedProjects
    .find({ id })
    .cloneDeep()
    .value()
}

function upsert (record) {
  const { id, related } = record
  logger.silly(`Upserting related projects for ${record.id} in database`)
  const existingRecord = relatedProjects.find(id)

  if (existingRecord.value()) {
    logger.silly(`Updating related projects record for ${record.id} in database`)
    existingRecord.assign({ related })
      .write()
  } else {
    logger.silly(`Creating new related projects record for ${record.id}`)
    relatedProjects.push({ id, related })
      .write()
  }
}

module.exports = {
  getById,
  upsert
}
