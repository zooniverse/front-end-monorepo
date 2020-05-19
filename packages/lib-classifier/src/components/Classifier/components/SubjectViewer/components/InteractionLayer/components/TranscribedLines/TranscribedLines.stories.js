import { storiesOf } from '@storybook/react'
import { GraphQLClient } from 'graphql-request'
import { Provider } from 'mobx-react'
import React from 'react'
import { Box, Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import sinon from 'sinon'
import RootStore from '@store/'
import { SubjectFactory, WorkflowFactory } from '@test/factories'
import readme from './README.md'
import { reducedASMSubject } from '@store/TranscriptionReductions/mocks'
import MultiFrameViewer from '@viewers/components/MultiFrameViewer'

const config = {
  notes: {
    markdown: readme
  }
}

const query = '{ workflow(id: 5339) { subject_reductions(subjectId: 13967054, reducerKey:"ext") { data } } }'
const subjectSnapshot = SubjectFactory.build({
  id: '13967054',
  locations: [{ 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/production/subject_location/bb2bf18b-4c1e-4a2a-8bc5-444347f44af1.jpeg' }],
  transcriptionReductions: {
    reductions: [reducedASMSubject.workflow.subject_reductions]
  }
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
// const subjectReductions = client.caesar.request(query)
sinon.stub(client.caesar, 'request').callsFake(() => Promise.resolve({
  workflow: { 
    subject_reductions: [reducedASMSubject]
  }
}))
const rootStore = RootStore.create({}, { client })
rootStore.workflows.setResource(workflowSnapshot)
rootStore.workflows.setActive(workflowSnapshot.id)
rootStore.subjects.setResource(subjectSnapshot)
rootStore.subjects.setActive(subjectSnapshot.id)
console.log('rootStore', rootStore.toJSON())
storiesOf('Drawing Tools | TranscribedLines', module)
  .add('default', () => (
    <Provider classifierStore={rootStore}>
      <Grommet theme={zooTheme}>
        <Box width='1000px'>
          <MultiFrameViewer subject={subjectSnapshot} />
        </Box>
      </Grommet>
    </Provider>
  ), config)
