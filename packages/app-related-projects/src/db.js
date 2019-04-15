const Loki = require('lokijs')

const db = new Loki('db', {
  indices: ['id'],
  unique: ['id']
})

module.exports = db
