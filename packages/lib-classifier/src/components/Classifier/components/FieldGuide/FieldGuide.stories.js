import React from 'react'
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import { Provider } from 'mobx-react'
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

const mockStore = {
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
        <Box height='60px' width='60px'>
          <FieldGuideConnector />
        </Box>
      </Grommet>
    </Provider>
  )
}

export function General (args) {
  return <FieldGuideStoryContext {...args} />
}

General.args = { darkMode: false }

