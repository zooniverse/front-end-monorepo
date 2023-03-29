import { Box, Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import asyncStates from '@zooniverse/async-states'
import zooTheme from '@zooniverse/grommet-theme'

import { SubjectFactory } from '@test/factories'
import mockStore from '@test/mockStore'

import SingleTextViewerConnector from './SingleTextViewerConnector'
import SingleTextViewerContainer from './SingleTextViewerContainer'

export default {
  title: 'Subject Viewers / SingleTextViewer',
  component: SingleTextViewerConnector,
  args: {
    dark: false,
    loadingState: asyncStates.success
  },
  argTypes: {
    loadingState: {
      options: Object.values(asyncStates),
      type: 'select'
    }
  }
}

const subjectSnapshot = SubjectFactory.build({
  id: '1234',
  locations: [
    { 'text/plain': 'https://panoptes-uploads-staging.zooniverse.org/subject_location/82eef33c-11ef-4f96-a4b3-526fc2d4e82f.txt' }
  ]
})

const store = mockStore({
  subject: subjectSnapshot
})

export const Default = ({
  dark,
  loadingState
}) => {
  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode={dark ? 'dark' : 'light'}
    >
      <Provider classifierStore={store}>
        <Box width='large'>
          <SingleTextViewerConnector
            loadingState={loadingState}
          />
        </Box>
      </Provider>
    </Grommet>
  )
}

const latest = {
  annotations: [
    {
      taskType: 'highlighter',
      value: [
        {
            "start": 77,
            "end": 101,
            "text": "Vitis rotundifolia Michx",
            "labelInformation": {
                "color": "#00FF7F",
                "label": "Species Name"
            }
        },
        {
            "start": 184,
            "end": 210,
            "text": "edge of forest along trail",
            "labelInformation": {
                "color": "#ffa539",
                "label": "Habitat"
            }
        },
        {
            "start": 334,
            "end": 350,
            "text": "Chris A. Fleming",
            "labelInformation": {
                "color": "#F5D76E",
                "label": "Collector Name"
            }
        },
        {
            "start": 355,
            "end": 369,
            "text": "Charles Winder",
            "labelInformation": {
                "color": "#F5D76E",
                "label": "Collector Name"
            }
        },
        {
            "start": 145,
            "end": 171,
            "text": "Lower Loop Overnight\nTrail",
            "labelInformation": {
                "color": "#DCC6E0",
                "label": "Location"
            }
        },
        {
            "start": 229,
            "end": 302,
            "text": "ca. 2.7\nkm W of trailhead at North Entrance of patk Sampson Quad.; 510 m.",
            "labelInformation": {
                "color": "#DCC6E0",
                "label": "Location"
            }
        }
      ]
    }
  ]
}

export const WithLabeledText = ({
  dark,
  loadingState
}) => {
  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode={dark ? 'dark' : 'light'}
    >
      <Box width='large'>
        <SingleTextViewerContainer
          latest={latest}
          loadingState={loadingState}
          subject={subjectSnapshot}
        />
      </Box>
    </Grommet>
  )
}
