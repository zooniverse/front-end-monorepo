import { GraphQLClient } from 'graphql-request'
import { Provider } from 'mobx-react'
import React from 'react'
import { Box, Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import asyncStates from '@zooniverse/async-states'
import sinon from 'sinon'
import mockStore from '@test/mockStore'
import { SubjectFactory, WorkflowFactory } from '@test/factories'
import readme from './README.md'
import { reducedASMSubject } from '@store/subjects/Subject/TranscriptionReductions/mocks'
import MultiFrameViewer from '@viewers/components/MultiFrameViewer'
import TooltipIcon from './components/TooltipIcon'

import TranscribedLines from './TranscribedLines'

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
  strings: {
    display_name: 'a test workflow',
    'tasks.T0.instruction': 'Transcribe a line',
    'tasks.T0.tools.0.details.0.instruction': 'Transcribe the text'
  },
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
const rootStore = mockStore({ client, subject: subjectSnapshot, workflow: workflowSnapshot})


function TranscribedLinesStory({ loadingState, stores, subject }) {
  return (
    <Provider classifierStore={stores}>
      <Grommet
        background={{
          dark: 'dark-1',
          light: 'light-1'
        }}
        theme={zooTheme}
        themeMode='light'
      >
        <Box width='1000px'>
          <MultiFrameViewer loadingState={loadingState} subject={subject} />
        </Box>
      </Grommet>
    </Provider>
  )
}

export default {
  title: 'Drawing Tools / TranscribedLines',
  component: TranscribedLines,
  parameters: {
    docs: {
      description: {
        component: readme
      }
    }
  }
}

export function Default({ loadingState, stores = rootStore, subject }) {
  return (
    <TranscribedLinesStory
      loadingState={loadingState}
      stores={stores}
      subject={subject}
    />
  )
}
Default.args = {
  loadingState: rootStore.subjects.loadingState,
  stores: rootStore,
  subject: rootStore.subjects.active
}

export function TooltipIconStory({ fill = 'drawing-pink' }) {
  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode='light'
    >
      <TooltipIcon fill={fill} />
    </Grommet>
  )
}

TooltipIconStory.args = {
  fill: 'drawing-pink'
}

TooltipIconStory.argTypes = {
  fill: {
    control: {
      type: 'select',
    },
    options: ['drawing-pink', 'light-5']
  }
}
