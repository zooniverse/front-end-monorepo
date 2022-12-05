import { panoptes } from '@zooniverse/panoptes-js'
import { useEffect, useState } from 'react';
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import sinon from 'sinon'

import FieldGuideConnector from './FieldGuideConnector'
import FieldGuideStore from '@store/FieldGuideStore'
import {
  FieldGuideFactory,
  FieldGuideMediumFactory
} from '@test/factories'
// import readme from './README.md'

// TODO: add readme
const config = {
  notes: {
    // markdown: readme
  }
}

const medium = FieldGuideMediumFactory.build()
const fieldGuide = FieldGuideFactory.build({
  items: [
    {
      content: 'All about cats',
      icon: medium.id,
      title: 'Cats'
    },
    {
      content: 'All about dogs',
      title: 'Dogs'
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
    'items.0.content': 'All about cats',
    'items.1.title': 'Dogs',
    'items.1.content': 'All about dogs'
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
  })
}

export default {
  title: 'Help Resources/Field Guide',
  component: FieldGuideConnector,
  parameters: {
    viewport: {
      defaultViewport: 'responsive'
    }
  }
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
      <Grommet
        background={{
          dark: 'dark-1',
          light: 'light-1'
        }}
        full
        theme={zooTheme}
        themeMode={(props.darkMode) ? 'dark' : 'light'}
      >
        <Box width='60px'>
          {ready && <FieldGuideConnector />}
        </Box>
      </Grommet>
    </Provider>
  )
}

export function General (args) {
  return <FieldGuideStoryContext {...args} />
}

General.args = { darkMode: false }

