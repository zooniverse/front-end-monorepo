import media from '../media/index.js'
import { buildResponse } from '../../utilityFunctions/utilityFunctions.js'
const { buildMockedMediumResource } = media.mocks

// Resources
const tutorialOne = {
  created_at: '2016-08-02T17:59:44.132Z',
  display_name: 'Survey Task Tutorial',
  href: '/tutorials/1',
  id: '1',
  kind: 'tutorial',
  language: 'en',
  links: { workflow_id: '10' },
  steps: [
    {
      content: 'Welcome to Animal Snapshots!',
      media: '1'
    }
  ],
  updated_at: '2017-03-27T19:00:56.369Z'
}

const tutorialTwo = {
  created_at: '2016-08-02T17:59:44.132Z',
  display_name: 'Drawing Task Tutorial',
  href: '/tutorials/2',
  id: '2',
  kind: 'tutorial',
  language: 'en',
  links: { workflow_id: '10' },
  steps: [
    {
      content: 'Welcome to Draw a Square!',
      media: '3'
    }
  ],
  updated_at: '2017-03-27T19:00:56.369Z'
}

const tutorialWithNullKind = {
  created_at: '2016-08-02T17:59:44.132Z',
  display_name: 'Question Task Tutorial',
  href: '/tutorials/3',
  id: '3',
  kind: null,
  language: 'en',
  links: { workflow_id: '10' },
  steps: [
    {
      content: 'Welcome to my survey!',
      media: '8'
    }
  ],
  updated_at: '2017-03-27T19:00:56.369Z'
}

const minicourse = {
  created_at: '2016-06-01T20:08:07.898Z',
  display_name: '',
  href: '/tutorials/52',
  id: '52',
  kind: 'mini-course',
  language: 'en',
  links: { workflow_id: '10' },
  steps: [{
    content: "Here's a fun fact",
    media: '50'
  }],
  updated_at: '2017-03-27T18:34:24.488Z'
}

const attachedImageOne = buildMockedMediumResource('attached_images', 'tutorial')

const attachedImageTwo = buildMockedMediumResource('attached_image', 'tutorial')

export const resources = {
  tutorialOne,
  tutorialTwo,
  tutorialWithNullKind,
  minicourse,
  attachedImageOne,
  attachedImageTwo
}

// Responses

const tutorialResponse = buildResponse('get', 'tutorials', [resources.tutorialOne], {})

const tutorials = buildResponse('get', 'tutorials', [resources.tutorialOne, resources.tutorialTwo], {})

const minicourseResponse = buildResponse('get', 'tutorials', [resources.minicourse], {})

const attachedImageResponse = buildResponse('get', 'media', [resources.attachedImageOne])

const tutorialWithImagesResponse = buildResponse('get', 'tutorials', [resources.tutorialOne], { media: [resources.attachedImageOne] })

const tutorialsWithImagesResponse = buildResponse('get', 'tutorials', [resources.tutorialOne, resources.tutorialTwo], { media: [resources.attachedImageOne, resources.attachedImageTwo] })

// The Lab UI doesn't actually allow project builders to link more than one tutorial of each kind to a workflow
// But this mock has both a tutorial with `tutorial` and `null` in addition to a `mini-course` kind
// To test the getTutorials function return value
const allTutorialsForWorkflowResponse = buildResponse('get', 'tutorials', [resources.tutorialWithNullKind, resources.tutorialOne, resources.tutorialTwo, resources.minicourse], {})

const queryNotFound = buildResponse('get', 'tutorials', [])

export const responses = {
  get: {
    allTutorialsForWorkflow: allTutorialsForWorkflowResponse,
    tutorial: tutorialResponse,
    tutorials,
    tutorialWithImages: tutorialWithImagesResponse,
    tutorialsWithImages: tutorialsWithImagesResponse,
    minicourse: minicourseResponse,
    attachedImage: attachedImageResponse,
    queryNotFound
  }
}
