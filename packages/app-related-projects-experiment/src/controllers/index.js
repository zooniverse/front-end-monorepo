const express = require('express')
const router = express.Router()

const relatedProjectsController = require('./relatedProjects')

router.use('/related-projects', relatedProjectsController)

module.exports = router
