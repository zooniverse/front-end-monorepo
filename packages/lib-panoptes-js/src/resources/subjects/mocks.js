const { buildResponse } = require('../../utilityFunctions')
const { buildSubjectsQueue } = require('./helpers')

const subject = {
  created_at: '2015-03-17T13:45:40.297Z',
  external_id: null,
  href: "/subjects/1",
  id: "1",
  links: { project: "1" },
  locations: [{
    'image/png': 'https://placekitten.com/408/287'
  }],
  metadata: {},
  updated_at: '2015-03-17T13:45:40.297Z',
  zooniverse_id: null
}

const subjectsQueue = buildSubjectsQueue()

const resources = {
  subject,
  subjectsQueue
}

const subjectResponse = buildResponse('get', 'subjects', [resources.subject], {})
const subjectsQueueResponse = buildResponse('get', 'subjects', subjectsQueue, {})

const responses = {
  get: {
    subject: subjectResponse,
    subjectsQueue: subjectsQueueResponse
  }
}

module.exports = {
  resources,
  responses
}