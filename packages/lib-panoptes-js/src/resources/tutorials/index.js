const { create, get, update, del } = require('./rest')
const { getAttachedImages, getMinicourses, getTutorials, getWithImages } = require('./commonRequests')
const { endpoint } = require('./helpers')
const mocks = require('./mocks')

module.exports = {
  create,
  get,
  update,
  delete: del,
  getAttachedImages,
  getMinicourses,
  getTutorials,
  getWithImages,
  endpoint,
  mocks
}
