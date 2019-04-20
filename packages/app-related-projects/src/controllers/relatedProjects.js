const express = require('express')

const generateRelatedProjects = require('../helpers/generateRelatedProjects')
const getTargetProject = require('../helpers/getTargetProject')
const relatedProjectsModel = require('../models/relatedProjects')

const router = express.Router()

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const targetProject = await getTargetProject(id)

  if (!targetProject) {
    res.status(404).send()
  }

  let result = relatedProjectsModel.getById(id)

  if (!result) {
    const newResult = generateRelatedProjects(targetProject)
    relatedProjectsModel.upsert({ id, related: newResult })
    result = newResult
  }

  res.send({
    related_projects: result
  })
})

module.exports = router
