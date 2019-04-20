const express = require('express')
const app = express()

const projectsModel = require('./models/projects')
const controllers = require('./controllers')
const populateDb = require('./helpers/populateDb')

const PORT = process.env.PORT || 3001

async function startApp () {
  app.use(controllers)

  await populateDb()
  console.info(`${projectsModel.count()} tagged projects loaded into database`)

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

startApp()
