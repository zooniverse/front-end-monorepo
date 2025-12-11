import { create, get, update, del } from './rest.js'
import { getSubjectQueue } from './commonRequests.js'
import { endpoint } from './helpers.js'
import mocks from './mocks.js'

const subjects = {
  create,
  get,
  update,
  delete: del,
  endpoint,
  getSubjectQueue,
  mocks
}

export default subjects
