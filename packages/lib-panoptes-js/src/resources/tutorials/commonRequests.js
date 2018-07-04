const panoptes = require('../../panoptes')
const { get } = require('./rest')
const { endpoint } = require('./helpers')

function getAttachedImages(params) {
  const tutorialId = (params && params.id) ? params.id : ''
  const tutorialAttachedImagesEndpoint = `${endpoint}/${tutorialId}/attached_images`

  return panoptes.get(tutorialAttachedImagesEndpoint)
}

function getWithImages (params) {
  const defaultInclude = { include: 'attached_images' }
  const queryParams = (params && params.query) ? Object.assign({}, params.query, defaultInclude) : defaultInclude

  return get(queryParams)
}

function getTutorials (params) {
  return get(queryParams).then((response) => {
    const { tutorials } = response.body

    if (tutorials && tutorials.length > 0) {
      // We allow the null value on kind for backwards compatibility
      // These are standard tutorials added prior to the 'kind' field and mini-courses
      return tutorials.filter((tutorial) => {
        return tutorial.kind === 'tutorial' || null;
      })
    }
  })
}

function getMinicourses (params) {
  const defaultKindParam = { kind: 'mini-course' }
  const queryParams = (params && params.query) ? Object.assign({}, params.query, defaultKindParam) : defaultKindParam

  return get(queryParams)
}

module.exports = { getAttachedImages, getMinicourses, getTutorials, getWithImages }