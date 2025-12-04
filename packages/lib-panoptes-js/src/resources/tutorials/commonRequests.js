import panoptes from '../../panoptes.js'
import { get } from './rest.js'
import { endpoint } from './helpers.js'
import { raiseError } from '../../utilityFunctions/utilityFunctions.js'

export function getAttachedImages (params) {
  const tutorialId = (params && params.id) ? params.id : ''
  const authorization = (params && params.authorization) ? params.authorization : ''

  if (tutorialId) {
    const queryParams = (params && params.query) ? params.query : {}
    const tutorialAttachedImagesEndpoint = `${endpoint}/${tutorialId}/attached_images`

    return panoptes.get(tutorialAttachedImagesEndpoint, queryParams, { authorization })
  }

  return raiseError('Tutorials: getAttachedImages request requires a tutorial id.', 'error')
}

export function getWithImages (params) {
  // We probably always want the attached_images when requesting a tutorial.
  // There is a known Panoptes bug with the include param returning unrelated attached_images
  // https://github.com/zooniverse/Panoptes/issues/2279
  // include request doesn't go past page one
  // tutorials shoudn't have more than 20 steps, so, this is a way to enforce that.
  const defaultInclude = { include: 'attached_images' }
  params.query = (params && params.query) ? Object.assign({}, params.query, defaultInclude) : defaultInclude

  return get(params)
}

export function getTutorials (params) {
  return get(params).then((response) => {
    if (response.body.tutorials && response.body.tutorials.length > 0) {
      // We allow the null value on kind for backwards compatibility
      // These are standard tutorials added prior to the 'kind' field and mini-courses
      response.body.tutorials = response.body.tutorials.filter((tutorial) => {
        return tutorial.kind === 'tutorial' || tutorial.kind === null
      })

      return response
    }

    return response
  })
}

export function getMinicourses (params) {
  const defaultKindParam = { kind: 'mini-course' }
  params.query = (params && params.query) ? Object.assign({}, params.query, defaultKindParam) : defaultKindParam

  return get(params)
}
