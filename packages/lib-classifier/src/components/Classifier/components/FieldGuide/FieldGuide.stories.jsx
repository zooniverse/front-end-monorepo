import { panoptes } from '@zooniverse/panoptes-js'
import { useEffect, useState } from 'react'
import { Box } from 'grommet'
import { Provider } from 'mobx-react'
import sinon from 'sinon'

import FieldGuideConnector from './FieldGuideConnector'
import FieldGuideStore from '@store/FieldGuideStore'
import {
  FieldGuideFactory,
  FieldGuideMediumFactory
} from '@test/factories'

const catsMarkdownContent = `
Here's a bunch of content so you can see how the field guide item scrolls.

Image:
![alt](https://panoptes-uploads-staging.zooniverse.org/project_background/0f4dba3f-4227-4bbb-ae1d-f1868226d5d6.jpeg)

Image that should pass through the thumbnailer:
![alt =200x](https://panoptes-uploads-staging.zooniverse.org/project_background/0f4dba3f-4227-4bbb-ae1d-f1868226d5d6.jpeg)

# This is a Header #

![J1003351.36-003340.8_sdss_decals.gif](https://panoptes-uploads.zooniverse.org/production/project_attached_image/7656d42d-4d25-42e1-9014-6b8876a5641f.gif =100x) 
*This is an image label. The above gif will not pass through the thumbnail service*

Video:
![alt](https://static.zooniverse.org/www.zooniverse.org/assets/home-video.mp4 =300x)

Audio:
![alt](https://panoptes-uploads.zooniverse.org/production/subject_location/1c93591f-5d7e-4129-a6da-a65419b88048.mpga)

Ordered list
1. One
2. Two
3. Three
`

const medium = FieldGuideMediumFactory.build()
const fieldGuide = FieldGuideFactory.build({
  items: [
    {
      icon: medium.id,
      title: 'Cats'
    },
    {
      icon: medium.id,
      title: 'Dogs1'
    },
    {
      title: 'Cats2'
    },
    {
      title: 'Dogs3'
    },
    {
      title: 'Cats4 a Longer Title with lots of words'
    },
    {
      title: 'Dogs5'
    },
    {
      title: 'Cats6'
    },
    {
      title: 'Dogs7'
    },
    {
      title: 'Cats8'
    },
    {
      title: 'Dogs9'
    }
  ]
})

const translated_id = fieldGuide.id
const translated_type = 'field_guide'
const translation = {
  language: 'en',
  translated_id,
  translated_type,
  strings: {
    'items.0.title': 'Cats',
    'items.0.content': catsMarkdownContent,
    'items.1.title': 'Dogs1',
    'items.1.content': 'All about dogs',
    'items.2.title': 'Cats2',
    'items.2.content': `It's raining cats and dogs`,
    'items.3.title': 'Dogs3',
    'items.3.content': 'All about dogs',
    'items.4.title': 'Cats4 a Longer Title with lots of words',
    'items.4.content': `It's raining cats and dogs`,
    'items.5.title': 'Dogs5',
    'items.5.content': 'All about dogs',
    'items.6.title': 'Cats6',
    'items.6.content': `It's raining cats and dogs`,
    'items.7.title': 'Dogs7',
    'items.7.content': 'All about dogs',
    'items.8.title': 'Cats8',
    'items.8.content': `It's raining cats and dogs`,
    'items.9.title': 'Dogs9',
    'items.9.content': 'All about dogs'
  }
}

const mockAPIResponse = {
  body: {
    translations: [translation]
  }
}

const mockStore = {
  locale: 'en',
  fieldGuide: FieldGuideStore.create({
    active: fieldGuide.id,
    attachedMedia: { [medium.id]: medium },
    resources: { [fieldGuide.id]: fieldGuide }
  }),
  subjectViewer: {
    separateFramesView: false
  }
}

export default {
  title: 'Help Resources/Field Guide',
  component: FieldGuideConnector
}

function FieldGuideStoryContext (props) {
  const [ready, setReady] = useState(false)
  useEffect(function () {
    sinon.stub(panoptes, 'get')
      .withArgs('/translations', { language: 'en', translated_id, translated_type })
      .resolves(mockAPIResponse)
    setReady(true)
    return () => {
      panoptes.get.restore()
    }
  }, [mockAPIResponse, panoptes, translated_id, translated_type])

  return (
    <Provider classifierStore={mockStore}>
      <Box width='60px'>
        {ready && <FieldGuideConnector />}
      </Box>
    </Provider>
  )
}

export function General (args) {
  return <FieldGuideStoryContext {...args} />
}
