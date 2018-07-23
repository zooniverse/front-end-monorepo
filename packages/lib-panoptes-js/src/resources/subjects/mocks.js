const { buildResponse } = require('../../utilityFunctions')

const subject = {
  created_at: "2015-03-17T13:45:53.402Z",
  external_id: null,
  href: "/subjects/10",
  id: "10",
  links: { project: "1" },
  locations:[{
    'image/png': 'https://placekitten.com/408/287'
  }],
  metadata: {},
  updated_at: "2015-03-17T13:45:53.402Z",
  zooniverse_id: null
}

const resources = {
  subject
}

const subjectResponse = buildResponse('get', 'subjects', [resources.subject], {})

const responses = {
  get: {
    subject: subjectResponse
  }
}

module.exports = {
  resources,
  responses
}