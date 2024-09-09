const { buildResponse } = require('../../utilityFunctions')
const { buildSubjectQueue } = require('./helpers')

const subject = {
  created_at: '2015-03-17T13:45:40.297Z',
  external_id: null,
  href: '/subjects/1',
  id: '1',
  links: { project: '1' },
  locations: [{
    'image/png': 'https://static.zooniverse.org/fem-assets/subject-placeholder.jpg'
  }],
  metadata: {},
  updated_at: '2015-03-17T13:45:40.297Z',
  zooniverse_id: null
}

const subjectQueue = buildSubjectQueue()

const resources = {
  subject,
  subjectQueue
}

const subjectResponse = buildResponse('get', 'subjects', [resources.subject], {})
const subjectQueueResponse = buildResponse('get', 'subjects', subjectQueue, {})

const responses = {
  get: {
    subject: subjectResponse,
    subjectQueue: subjectQueueResponse
  }
}

module.exports = {
  resources,
  responses
}
