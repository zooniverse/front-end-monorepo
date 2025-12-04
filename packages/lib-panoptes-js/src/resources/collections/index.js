import { create, get, update, del } from './rest.js'
import { addSubjects, removeSubjects } from './commonRequests.js'
import { endpoint } from './helpers.js'
import mocks from './mocks.js'

const collections = {
  create,
  get,
  delete: del,
  update,
  endpoint,
  addSubjects,
  removeSubjects,
  mocks
}

export default collections
