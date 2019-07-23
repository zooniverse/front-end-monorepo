const express = require('express')

const generateRelatedProjects = require('../helpers/generateRelatedProjects')
const getTargetProject = require('../helpers/getTargetProject')
const logger = require('../logger')
const relatedProjectsModel = require('../models/relatedProjects')

const router = express.Router()

router.get('/:id', async (req, res) => {
  const { id } = req.params
  logger.debug(`Received request for project ${id}`)

  const targetProject = await getTargetProject(id)

  if (!targetProject) {
    logger.warn(`Project ${id} not found on Panoptes`)
    res.status(404).send()
    return false
  }

  let result = relatedProjectsModel.getById(id)

  if (!result) {
    logger.debug(`Cached result not found for project ${id}, generating related projects`)
    const newResult = generateRelatedProjects(targetProject)
    relatedProjectsModel.upsert({ id, related: newResult })
    result = newResult
  } else {
    logger.debug(`Cached result found for project ${id}`)
  }

  logger.debug(`Returning result for project ${id}: ${JSON.stringify(result)}`)
  res.send({
    related_projects: result
  })
})

module.exports = router
