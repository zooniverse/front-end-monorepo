import { Box } from 'grommet'
import { Provider } from 'mobx-react'
import asyncStates from '@zooniverse/async-states'

import { SubjectFactory } from '@test/factories'
import mockStore from '@test/mockStore'

import SingleTextViewerConnector from './SingleTextViewerConnector'
import SingleTextViewerContainer from './SingleTextViewerContainer'

export default {
  title: 'Subject Viewers / SingleTextViewer',
  component: SingleTextViewerConnector,
  args: {
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

export function Default({ loadingState }) {
  return (
    <Provider classifierStore={store}>
      <Box width='large'>
        <SingleTextViewerConnector loadingState={loadingState} />
      </Box>
    </Provider>
  )
}

const value = [
  {
      "labelInformation": {
          "color": "#e65252",
          "label": "Scientific Name"
      },
      "start": 77,
      "end": 101,
      "text": "Vitis rotundifolia Michx"
  },
  {
      "labelInformation": {
          "color": "#f1ae45",
          "label": "Date"
      },
      "start": 316,
      "end": 325,
      "text": "9/15/2001"
  },
  {
      "labelInformation": {
          "color": "#fced54",
          "label": "Country"
      },
      "start": 17,
      "end": 39,
      "text": "UNIVERSTY OF TENNESSEE"
  },
  {
      "labelInformation": {
          "color": "#ee7bcf",
          "label": "County"
      },
      "start": 60,
      "end": 76,
      "text": "Van Baren County"
  },
  {
      "labelInformation": {
          "color": "#c7f55b",
          "label": "State / Province"
      },
      "start": 50,
      "end": 59,
      "text": "Tennessee"
  },
  {
      "labelInformation": {
          "color": "#65eeca",
          "label": "Locality"
      },
      "start": 184,
      "end": 227,
      "text": "edge of forest along trail near campsite #1"
  },
  {
      "labelInformation": {
          "color": "#52db72",
          "label": "Scientific Name"
      },
      "start": 102,
      "end": 129,
      "text": "Fall Creek Falls State Park"
  },
  {
      "labelInformation": {
          "color": "#7cdff2",
          "label": "Country"
      },
      "start": 229,
      "end": 294,
      "text": "ca. 2.7\nkm W of trailhead at North Entrance of patk Sampson Quad."
  },
  {
      "labelInformation": {
          "color": "#8aa0d3",
          "label": "State / Province"
      },
      "start": 334,
      "end": 369,
      "text": "Chris A. Fleming and Charles Winder"
  },
  {
      "labelInformation": {
          "color": "#c17ddf",
          "label": "County"
      },
      "start": 303,
      "end": 315,
      "text": "No: FCF-1589"
  },
  {
      "labelInformation": {
          "color": "#e7bbe3",
          "label": "Date"
      },
      "start": 131,
      "end": 171,
      "text": "Located along Lower Loop Overnight\nTrail"
  }
]


const latest = {
  annotations: [
    {
      taskType: 'highlighter',
      value: value
    }
  ]
}

export const WithLabeledText = ({
  loadingState
}) => {
  return (
    <Box width='large'>
      <SingleTextViewerContainer
        latest={latest}
        loadingState={loadingState}
        subject={store.subjects.active}
      />
    </Box>
  )
}
