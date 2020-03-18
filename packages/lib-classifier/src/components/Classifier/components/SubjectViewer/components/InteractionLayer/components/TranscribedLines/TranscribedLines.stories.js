import { storiesOf } from '@storybook/react'
import { GraphQLClient } from 'graphql-request'
import { Provider } from 'mobx-react'
import React from 'react'
import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import sinon from 'sinon'
import RootStore from '@store/'
import { SubjectFactory, WorkflowFactory } from '@test/factories'
import InteractionLayer from '../../../InteractionLayer'
import readme from './README.md'
import { reducedSubject } from '@store/TranscriptionReductions/mocks'

const config = {
  notes: {
    markdown: readme
  }
}

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
        { type: 'transcriptionLine' }
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
sinon.stub(client.caesar, 'request').callsFake(
  () => Promise.resolve({ workflow: { subject_reductions: [{ data: reducedSubject }] }})
)
const rootStore = RootStore.create({}, { client })
rootStore.workflows.setResource(workflowSnapshot)
rootStore.workflows.setActive(workflowSnapshot.id)
rootStore.subjects.setResource(subjectSnapshot)
rootStore.subjects.setActive(subjectSnapshot.id)

storiesOf('TranscribedLines', module)
  .add('default', () => (
    <Provider classifierStore={rootStore}>
      <Grommet theme={zooTheme}>
        <svg viewBox='0 0 1292 2000' height={646} width={1000}>
          <image xlinkHref='https://panoptes-uploads.zooniverse.org/production/subject_location/bb2bf18b-4c1e-4a2a-8bc5-444347f44af1.jpeg' />
          <InteractionLayer
            height={2000}
            scale={0.5}
            width={1292}
          />
        </svg>
      </Grommet>
    </Provider>
  ), config)
