const express = require('express')

const filterSelf = require('../helpers/filterSelf')
const sortByMatchingTags = require('../helpers/sortByMatchingTags')
const getTargetProject = require('../helpers/getTargetProject')
const collectionModel = require('../models/collection')

const router = express.Router()

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const targetProject = await getTargetProject(id)

  if (!targetProject) {
    res.status(404).send()
  }

  const boundFilterSelf = record => filterSelf(record, targetProject)
  const boundSortByMatchingTags = (record1, record2) =>
    sortByMatchingTags(record1, record2, targetProject)

  const relatedProjects = collectionModel.addDynamicView(id)
    .applyWhere(boundFilterSelf)
    .applySort(boundSortByMatchingTags)
    .data()

  const result = relatedProjects
    .slice(0, 3)
    .map(relatedProject => relatedProject.id)

  res.send({
    related_projects: result
  })

  collectionModel.removeDynamicView(id)
})

module.exports = router
