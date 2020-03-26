import { withKnobs, boolean, select } from '@storybook/addon-knobs'
import asyncStates from '@zooniverse/async-states'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { types } from 'mobx-state-tree'
import React from 'react'
import { Box, Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import { Tasks } from './Tasks'
import ClassificationStore from '@store/ClassificationStore'
import SubjectStore from '@store/SubjectStore'
import WorkflowStore from '@store/WorkflowStore'
import WorkflowStepStore from '@store/WorkflowStepStore'

function createStore() {
  const classifications = ClassificationStore.create()
  const mockSubject = {
    id: 'subject',
    metadata: {}
  }
  const mockWorkflow = {
    id: 'workflow',
    version: '1.0'
  }
  const mockProject = {
    id: 'project'
  }

  const store = types.model('MockStore', {
    classifications: ClassificationStore,
    subjects: SubjectStore,
    workflows: WorkflowStore,
    workflowSteps: WorkflowStepStore
  })
  .create({
    classifications,
    subjects: SubjectStore.create({}),
    workflows: WorkflowStore.create({}),
    workflowSteps: WorkflowStepStore.create({})
  })
  classifications.createClassification(mockSubject, mockWorkflow, mockProject)
  return store
}

const store = createStore()
function addStepToStore (step, tasks) {
  const steps = [ ['S1', step] ]
  store.workflowSteps.setStepsAndTasks({ steps, tasks })
  store.workflowSteps.active.tasks.forEach(task => store.classifications.addAnnotation(task))
}

function MockTask (props) {
  const { dark, ...taskProps } = props

  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={Object.assign({}, zooTheme, { dark })}
      themeMode={(dark) ? 'dark' : 'light'}
    >
      <Box
        background={{
          dark: 'dark-3',
          light: 'neutral-6'
        }}
        pad='1em'
        width='380px'
      >
        <Tasks
          {...taskProps}
        />
      </Box>
    </Grommet>
  )
}

storiesOf('Tasks', module)
  .addDecorator(withKnobs)
  .addParameters({
    viewport: {
      defaultViewport: 'responsive'
    }
  })
  .add('loading', function () {
    return (
      <Provider classifierStore={{}}>
        <MockTask
          loadingState={asyncStates.loading}
        />
      </Provider>
    )
  })
  .add('error', function () {
    return (
      <Provider classifierStore={{}}>
        <MockTask
          loadingState={asyncStates.error}
        />
      </Provider>
    )
  })
  .add('single task', function () {
    const tasks = {
      init: {
        answers: [{ label: 'yes' }, { label: 'no' }],
        help: 'Choose an answer from the choices given, then press Done.',
        question: 'Is there a cat?',
        required: boolean('Required', false),
        taskKey: 'init',
        type: 'single'
      }
    }
    const step = {
      stepKey: 'S1',
      taskKeys: ['init']
    }
    addStepToStore(step, tasks)
    const dark = boolean('Dark theme', false)
    const subjectReadyState = select('Subject loading', asyncStates, asyncStates.success)
    const isThereTaskHelp = boolean('Enable task help', true)
    return (
      <Provider classifierStore={store}>
        <MockTask
          dark={dark}
          classification={store.classifications.active}
          isThereTaskHelp={isThereTaskHelp}
          loadingState={asyncStates.success}
          step={store.workflowSteps.active}
          subjectReadyState={subjectReadyState}
        />
      </Provider>
    )
  })
  .add('multiple tasks', function () {
    const tasks = {
      init: {
        answers: [{ label: 'yes' }, { label: 'no' }],
        help: 'Choose an answer from the choices given, then press Done.',
        question: 'Is there a cat?',
        required: boolean('Required', false),
        taskKey: 'init',
        type: 'single'
      },
      T1: {
        answers: [{ label: 'sleeping' }, { label: 'playing' }, { label: 'looking indifferent' }],
        help: 'Pick as many answers as apply, then press Done.',
        question: 'What is it doing?',
        required: false,
        taskKey: 'T1',
        type: 'multiple'
      }
    }
    const step = {
      stepKey: 'S1',
      taskKeys: ['init', 'T1']
    }
    addStepToStore(step, tasks)
    const dark = boolean('Dark theme', false)
    const subjectReadyState = select('Subject loading', asyncStates, asyncStates.success)
    const isThereTaskHelp = boolean('Enable task help', true)
    return (
      <Provider classifierStore={store}>
        <MockTask
          dark={dark}
          classification={store.classifications.active}
          isThereTaskHelp={isThereTaskHelp}
          loadingState={asyncStates.success}
          step={store.workflowSteps.active}
          subjectReadyState={subjectReadyState}
        />
      </Provider>
    )
  })
  .add('text', function () {
    const tasks = {
      T0: {
        help: 'Type something into the text box.',
        instruction: 'Type something here',
        taskKey: 'T0',
        text_tags: ['insertion', 'deletion'],
        type: 'text'
      }
    }
    const step = {
      stepKey: 'S1',
      taskKeys: ['T0']
    }
    addStepToStore(step, tasks)
    const dark = boolean('Dark theme', false)
    const subjectReadyState = select('Subject loading', asyncStates, asyncStates.success)
    const isThereTaskHelp = boolean('Enable task help', true)
    return (
      <Provider classifierStore={store}>
        <MockTask
          dark={dark}
          classification={store.classifications.active}
          isThereTaskHelp={isThereTaskHelp}
          loadingState={asyncStates.success}
          step={store.workflowSteps.active}
          subjectReadyState={subjectReadyState}
        />
      </Provider>
    )
  })
  .add('drawing', function () {
    const tasks = {
      T2: {
        help: 'Draw on the image.',
        instruction: 'Draw something',
        taskKey: 'T2',
        tools: [
          {
            color: zooTheme.global.colors['drawing-red'],
            help: '',
            label: 'Draw a line',
            type: 'line'
          }, {
            color: zooTheme.global.colors['drawing-blue'],
            help: '',
            label: 'Point please.',
            min: 1,
            max: 2,
            type: 'point',
          }, {
            color: zooTheme.global.colors['drawing-green'],
            help: '',
            label: 'Draw under the text',
            type: 'transcriptionLine'
          }, {
            color: zooTheme.global.colors['drawing-orange'],
            help: '',
            label: 'Draw a rectangle',
            type: 'rectangle',
          }, {
            color: zooTheme.global.colors['drawing-yellow'],
            help: '',
            label: 'Draw an ellipse',
            type: 'ellipse',
          }
        ],
        type: 'drawing'
      }
    }
    const step = {
      stepKey: 'S1',
      taskKeys: ['T2']
    }
    addStepToStore(step, tasks)
    const dark = boolean('Dark theme', false)
    const subjectReadyState = select('Subject loading', asyncStates, asyncStates.success)
    const isThereTaskHelp = boolean('Enable task help', true)
    return (
      <Provider classifierStore={store}>
        <MockTask
          dark={dark}
          classification={store.classifications.active}
          isThereTaskHelp={isThereTaskHelp}
          loadingState={asyncStates.success}
          step={store.workflowSteps.active}
          subjectReadyState={subjectReadyState}
        />
      </Provider>
    )
  })
  .add('transcription', function () {
    const tasks = {
      T3: {
        help: 'Underline the line to transcribe with two clicks, then enter in the text transcription.',
        instruction: 'Underline and transcribe',
        taskKey: 'T3',
        tools: [
          {
            help: '',
            label: 'Draw under the text',
            type: 'transcriptionLine'
          }
        ],
        type: 'transcription'
      }
    }
    const step = {
      stepKey: 'S1',
      taskKeys: ['T3']
    }
    addStepToStore(step, tasks)
    const dark = boolean('Dark theme', false)
    const subjectReadyState = select('Subject loading', asyncStates, asyncStates.success)
    const isThereTaskHelp = boolean('Enable task help', true)
    return (
      <Provider classifierStore={store}>
        <MockTask
          dark={dark}
          classification={store.classifications.active}
          isThereTaskHelp={isThereTaskHelp}
          loadingState={asyncStates.success}
          step={store.workflowSteps.active}
          subjectReadyState={subjectReadyState}
        />
      </Provider>
    )
  })