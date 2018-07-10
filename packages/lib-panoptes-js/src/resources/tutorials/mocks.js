const media = require('../media')
const { buildResponse } = require('../../utilityFunctions')
const { buildMockedMediumResource } = media.mocks

// Resources
const tutorial = {
  created_at: "2016-08-02T17:59:44.132Z",
  display_name: "Survey Task Tutorial",
  href: "/tutorials/1",
  id: "1",
  kind: "tutorial",
  language: "en",
  links: { },
  steps: [
    {
      content: "Welcome to Animal Snapshots!",
      media: "1"
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
  links: { },
  steps: [{
    content: "Here's a fun fact",
    media: "50"
  }],
  updated_at: "2017-03-27T18:34:24.488Z"
}

const attachedImage = buildMockedMediumResource('attached_images', 'tutorial')

const resources = {
  tutorial,
  minicourse,
  attachedImage
}

// Responses

const tutorialResponse = buildResponse('get', 'tutorials', [resources.tutorial], {})

const minicourseResponse = buildResponse('get', 'tutorials', [response.minicourse], {})

const attachedImageResponse = build('get', 'media', [response.attachedImage], {})

const responses = {
  get: {
    tutorial: tutorialResponse,
    minicourse: minicourseResponse,
    attachedImage: attachedImageResponse
  }
}

module.exports = {
  resources,
  responses
}