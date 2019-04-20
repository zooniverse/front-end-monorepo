const express = require('express')
const app = express()

const controllers = require('./controllers')
const populateDb = require('./helpers/populateDb')
const logger = require('./logger')
const projectsModel = require('./models/projects')

const PORT = process.env.PORT || 3001

async function startApp () {
  logger.info(`Starting app...`)

  app.use(controllers)

  await populateDb()
  logger.info(`${projectsModel.count()} tagged projects loaded into database`)

  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
  })
}

startApp()
