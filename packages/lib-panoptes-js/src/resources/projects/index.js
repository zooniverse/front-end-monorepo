import { create, get, update, del } from './rest.js'
import { getBySlug, getWithLinkedResources } from './commonRequests.js'
import { endpoint } from './helpers.js'
import mocks from './mocks.js'

export default {
  create,
  get,
  update,
  delete: del,
  endpoint,
  getBySlug,
  getWithLinkedResources,
  mocks
}
