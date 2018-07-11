const panoptes = require('../../panoptes')
const tutorials = require('./index')
const { endpoint } = require('./helpers')
const { raiseError } = require('../../utilityFunctions')

function getAttachedImages(params) {
  const tutorialId = (params && params.id) ? params.id : ''

  if (tutorialId) {
    const queryParams = (params && params.query) ? params.query : {}
    const tutorialAttachedImagesEndpoint = `${endpoint}/${tutorialId}/attached_images`

    return panoptes.get(tutorialAttachedImagesEndpoint, queryParams)
  }

  return raiseError('Tutorials: getAttachedImages request requires a tutorial id.', 'error')
}

function getWithImages (params) {
  // We probably always want the attached_images when requesting a tutorial.
  // There is a known Panoptes bug with the include param returning unrelated attached_images
  // https://github.com/zooniverse/Panoptes/issues/2279
  // include request doesn't go past page one
  // tutorials shoudn't have more than 20 steps, so, this is a way to enforce that.
  const defaultInclude = { include: 'attached_images' }
  const queryParams = (params && params.query) ? Object.assign({}, params.query, defaultInclude) : defaultInclude
  return tutorials.get(queryParams)
}

function getTutorials (params) {
  return tutorials.get(queryParams).then((response) => {
    const tutorialsResponse = response.body.tutorials

    if (tutorialsResponse && tutorialsResponse.length > 0) {
      // We allow the null value on kind for backwards compatibility
      // These are standard tutorials added prior to the 'kind' field and mini-courses
      return tutorialsResponse.filter((tutorial) => {
        return tutorial.kind === 'tutorial' || null;
      })
    }
  })
}

function getMinicourses (params) {
  const defaultKindParam = { kind: 'mini-course' }
  const queryParams = (params && params.query) ? Object.assign({}, params.query, defaultKindParam) : defaultKindParam

  return tutorials.get(queryParams)
}

module.exports = { getAttachedImages, getMinicourses, getTutorials, getWithImages }