import { storiesOf } from '@storybook/react'
import { withKnobs, text, select } from "@storybook/addon-knobs"
import { GraphQLClient } from 'graphql-request'
import { Provider } from 'mobx-react'
import React from 'react'
import { Box, Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import asyncStates from '@zooniverse/async-states'
import sinon from 'sinon'
import RootStore from '@store/'
import { SubjectFactory, WorkflowFactory } from '@test/factories'
import readme from './README.md'
import { reducedASMSubject } from '@store/TranscriptionReductions/mocks'
import MultiFrameViewer from '@viewers/components/MultiFrameViewer'
import TooltipLabel from './components/TooltipLabel'

const config = {
  notes: {
    markdown: readme
  }
}

const query = '{ workflow(id: 5339) { subject_reductions(subjectId: 13967054, reducerKey:"ext") { data } } }'
const subjectSnapshot = SubjectFactory.build({
  id: '13967054',
  locations: [{ 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/production/subject_location/bb2bf18b-4c1e-4a2a-8bc5-444347f44af1.jpeg' }]
})

const workflowSnapshot = WorkflowFactory.build({
  id: '5339',
  display_name: 'A test workflow',
  steps: [
    ['S1', { stepKey: 'S1', taskKeys: ['T0']}]
  ],
  tasks: {
    T0: {
      instruction: 'Transcribe a line',
      type: 'transcription',
      tools: [
        {
          details: [
            {
              instruction: 'Transcribe the text',
              required: 'true',
              taskKey: 'T0.0',
              type: 'text'
            },
          ],
          type: 'transcriptionLine'
        }
      ]
    }
  },
  version: '0.0'
})

const client = {
  panoptes: {
    get: () => Promise.resolve({ body: {
        subjects: [],
        workflows: []
      }
    })
  },
  caesar: new GraphQLClient('https://caesar.zooniverse.org/graphql'),
  tutorials: {
    get: () => Promise.resolve({ body: { tutorials: [] }})
  }
}
sinon.stub(client.caesar, 'request').callsFake(() => Promise.resolve(reducedASMSubject))
const rootStore = RootStore.create({}, { client })
rootStore.workflows.setResources([workflowSnapshot])
rootStore.workflows.setActive(workflowSnapshot.id)
rootStore.subjects.setResources([subjectSnapshot])
rootStore.subjects.setActive(subjectSnapshot.id)

class TranscribedLinesStory extends React.Component {
  constructor() {
    super()

    this.state = {
      loadingState: asyncStates.initialized
    }
  }

  componentDidMount() {
    // what needs this time to make the svg ref to be defined?
    // 100ms isn't enough time 1000ms is
    setTimeout(() => this.setState({ loadingState: asyncStates.success }), 1000)
  }

  render() {
    return (
      <Provider classifierStore={rootStore}>
        <Grommet
          background={{
            dark: 'dark-1',
            light: 'light-1'
          }}
          theme={zooTheme}
          themeMode='light'
        >
          <Box width='1000px'>
            <MultiFrameViewer loadingState={this.state.loadingState} subject={subjectSnapshot} />
          </Box>
        </Grommet>
      </Provider>
    )
  }
}

const stories = storiesOf('Drawing Tools | TranscribedLines', module)

stories.addDecorator(withKnobs)

stories
  .add('default', () => (
    <TranscribedLinesStory />
  ), config)
  .add('Tooltip Label', () => (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode='light'
    >
      <TooltipLabel fill={select('Fill color', ['drawing-purple', 'light-5'], 'drawing-purple')} label={text('Label text', 'This line has been transcribed')} />
    </Grommet>
  ), config)
