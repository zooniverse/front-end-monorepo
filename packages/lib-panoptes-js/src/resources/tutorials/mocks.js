const media = require('../media')
const { buildResponse } = require('../../utilityFunctions')
const { buildMockedMediumResource } = media.mocks

// Resources
const tutorialOne = {
  created_at: "2016-08-02T17:59:44.132Z",
  display_name: "Survey Task Tutorial",
  href: "/tutorials/1",
  id: "1",
  kind: "tutorial",
  language: "en",
  links: { workflow_id: '10' },
  steps: [
    {
      content: "Welcome to Animal Snapshots!",
      media: "1"
    }
  ],
  updated_at: "2017-03-27T19:00:56.369Z"
}

const tutorialTwo = {
  created_at: "2016-08-02T17:59:44.132Z",
  display_name: "Drawing Task Tutorial",
  href: "/tutorials/2",
  id: "2",
  kind: "tutorial",
  language: "en",
  links: { workflow_id: '10' },
  steps: [
    {
      content: "Welcome to Draw a Square!",
      media: "3"
    }
  ],
  updated_at: "2017-03-27T19:00:56.369Z"
}

const minicourse = {
  created_at: "2016-06-01T20:08:07.898Z",
  display_name: "",
  href: "/tutorials/52",
  id: "52",
  kind: "mini-course",
  language: "en",
  links: { workflow_id: '10' },
  steps: [{
    content: "Here's a fun fact",
    media: "50"
  }],
  updated_at: "2017-03-27T18:34:24.488Z"
}

const attachedImage = buildMockedMediumResource('attached_images', 'tutorial')

const resources = {
  tutorialOne,
  tutorialTwo,
  minicourse,
  attachedImage
}

// Responses

const tutorialResponse = buildResponse('get', 'tutorials', [resources.tutorialOne], {})

const tutorials = buildResponse('get', 'tutorials', [resources.tutorialOne, resources.tutorialTwo], {})

const minicourseResponse = buildResponse('get', 'tutorials', [resources.minicourse], {})

const attachedImageResponse = buildResponse('get', 'media', [resources.attachedImage])

const queryNotFound = buildResponse('get', 'tutorials', [])

const responses = {
  get: {
    tutorial: tutorialResponse,
    tutorials,
    minicourse: minicourseResponse,
    attachedImage: attachedImageResponse,
    queryNotFound
  }
}

module.exports = {
  resources,
  responses
}