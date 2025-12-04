import { create, get, update, del } from './rest.js'
import { getAttachedImages, getMinicourses, getTutorials } from './commonRequests.js'
import { endpoint } from './helpers.js'
import mocks from './mocks.js'

const tutorials = {
  create,
  get,
  update,
  delete: del,
  getAttachedImages,
  getMinicourses,
  getTutorials,
  endpoint,
  mocks
}

export default tutorials
