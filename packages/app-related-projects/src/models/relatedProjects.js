const db = require('../db')

const relatedProjects = db.get('relatedProjects')

function getById (id) {
  return relatedProjects
    .find({ id })
    .cloneDeep()
    .value()
}

function upsert (record) {
  const { id, related } = record
  const existingRecord = relatedProjects.find(id)

  if (existingRecord.value()) {
    existingRecord.assign({ related })
      .write()
  } else {
    relatedProjects.push({ id, related })
      .write()
  }
}

module.exports = {
  getById,
  upsert
}
