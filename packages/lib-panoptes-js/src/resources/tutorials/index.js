import { create, get, update, del } from './rest.js'
import { getAttachedImages, getMinicourses, getTutorials } from './commonRequests.js'
import { endpoint } from './helpers.js'
import mocks from './mocks.js'

export default {
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
