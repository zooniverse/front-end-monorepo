import React from 'react'
import { storiesOf } from '@storybook/react'
import asyncStates from '@zooniverse/async-states'
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import { Factory } from 'rosie'
import SubjectViewerStore from '@store/SubjectViewerStore'
import SingleTextViewer from '@viewers/components/SingleTextViewer'
import readme from './README.md'
import backgrounds from '../../../../../../../.storybook/lib/backgrounds'

const config = {
  notes: {
    markdown: readme
  }
}

const subject = Factory.build('subject', {
  content: 'Herbarium of the University of North Carolina\nSOUTH CAROLINA\nCharleston County\nGnaphalium peregrinum Fern,\nrailroad right-of-way, Johns Island Station on\nCounty Rt. 20 (wes t of Charleston.\nHarry E. Ahles 22002 April 2, 1957\nwith John G. Haesloop\nCollected for the “Flora of the Carolinas"',
  contentLoadingState: asyncStates.success
})

const mockStore = {
  classifications: {
    active: {
      annotations: new Map()
    }
  },
  fieldGuide: {
    setModalVisibility: () => {}
  },
  subjects: {
    active: subject
  },
  subjectViewer: SubjectViewerStore.create({}),
  workflowSteps: {
    activeStepTasks: []
  }
}

function ViewerContext (props) {
  const { children, theme } = props
  return (
    <Provider classifierStore={mockStore}>
      <Grommet theme={theme}>
        {children}
      </Grommet>
    </Provider>
  )
}

const darkThemeConfig = Object.assign({}, config, { backgrounds: backgrounds.darkDefault })

storiesOf('Subject Viewers / SingleTextViewer', module)
  .addParameters({ component: SingleTextViewer })
  .add('light theme', () => {
    return (
      <ViewerContext theme={zooTheme}>
        <Box height='500px' width='large'>
          <SingleTextViewer />
        </Box>
      </ViewerContext>
    )
  }, config)
  .add('dark theme', () => {
    const darkZooTheme = Object.assign({}, zooTheme, { dark: true })
    return (
      <ViewerContext theme={darkZooTheme}>
        <Box height='500px' width='large'>
          <SingleTextViewer />
        </Box>
      </ViewerContext>
    )
  }, darkThemeConfig)
