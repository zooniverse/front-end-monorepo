const low = require('lowdb')
const Memory = require('lowdb/adapters/Memory')

const db = low(new Memory())

db.defaults({ projects: [], relatedProjects: [] })
  .write()

module.exports = db
