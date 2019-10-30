import { withKnobs, boolean, select } from '@storybook/addon-knobs'
import asyncStates from '@zooniverse/async-states'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import React from 'react'
import sinon from 'sinon'
import { Box, Grommet } from 'grommet'
import { Provider } from "mobx-react"

import { Tasks } from './Tasks'

const mockStore = {
  classifications: {},
  subjects: {},
  subjectViewer: {
    loadingState: asyncStates.loading
  },
  workflows: {
    loadingState: asyncStates.loading
  },
  workflowSteps: {
    isThereANextStep: () => false,
    isThereAPreviousStep: () => false
  }
}

function MockTask({ dark, isThereTaskHelp, subjectReadyState, step, store, tasks, zooTheme}) {
  const background = dark ?
    zooTheme.global.colors['dark-1'] :
    zooTheme.global.colors['light-1']
  return (
    <Provider classifierStore={store}>
      <Grommet theme={Object.assign({}, zooTheme, { dark })}>
        <Box
          background={background}
          pad='1em'
          width='380px'
        >
          <Tasks
            isThereTaskHelp={isThereTaskHelp}
            loadingState={asyncStates.success}
            step={step}
            subjectReadyState={subjectReadyState}
            tasks={tasks}
          />
        </Box>
      </Grommet>
    </Provider>
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
    <Provider classifierStore={mockStore}>
      <Grommet theme={zooTheme}>
        <Tasks
          loadingState={asyncStates.loading}
        />
      </Grommet>
    </Provider>
  )
})
.add('single task', function () {
  const step = null
  const tasks = [{
    annotation: { task: 'init' },
    answers: [{ label: 'yes' }, { label: 'no' }],
    help: 'Choose an answer from the choices given, then press Done.',
    question: 'Is there a cat?',
    required: true,
    taskKey: 'init',
    type: 'single',
    updateAnnotation: sinon.stub()
  }]
  const dark = boolean('Dark theme', false)
  const subjectReadyState = select('Subject loading', asyncStates, asyncStates.success)
  const isThereTaskHelp = boolean('Enable task help', true)
  const store = Object.assign({}, mockStore, {
    workflows: {
      loadingState: asyncStates.success
    },
    workflowSteps: {
      activeStepTasks: tasks,
      isThereANextStep: () => false,
      isThereAPreviousStep: () => false,
      isThereTaskHelp: true
    }
  })
  return (
    <MockTask
      dark={dark}
      isThereTaskHelp={isThereTaskHelp}
      loadingState={asyncStates.success}
      step={step}
      store={store}
      subjectReadyState={subjectReadyState}
      tasks={tasks}
      zooTheme={zooTheme}
    />
  )
})
.add('multiple tasks', function () {
  const step = null
  const tasks = [
    {
      annotation: { task: 'T0' },
      answers: [{ label: 'yes' }, { label: 'no' }],
      help: 'Choose an answer from the choices given, then press Done.',
      question: 'Is there a cat?',
      required: true,
      taskKey: 'T0',
      type: 'single',
      updateAnnotation: sinon.stub()
    },
    {
      annotation: { task: 'T1', value: [] },
      answers: [{ label: 'sleeping' }, { label: 'playing' }, { label: 'looking indifferent' }],
      help: 'Pick as many answers as apply, then press Done.',
      question: 'What is it doing?',
      required: true,
      taskKey: 'T1',
      type: 'multiple',
      updateAnnotation: sinon.stub()
    }
  ]
  const dark = boolean('Dark theme', false)
  const subjectReadyState = select('Subject loading', asyncStates, asyncStates.success)
  const isThereTaskHelp = boolean('Enable task help', true)
  const store = Object.assign({}, mockStore, {
    workflows: {
      loadingState: asyncStates.success
    },
    workflowSteps: {
      activeStepTasks: tasks,
      isThereANextStep: () => false,
      isThereAPreviousStep: () => false,
      isThereTaskHelp: true
    }
  })
  return (
    <MockTask
      dark={dark}
      isThereTaskHelp={isThereTaskHelp}
      loadingState={asyncStates.success}
      step={step}
      store={store}
      subjectReadyState={subjectReadyState}
      tasks={tasks}
      zooTheme={zooTheme}
    />
  )
})
.add('text', function () {
  const step = null
  const tasks = [
    {
      annotation: { task: 'T0', value: '' },
      help: 'Type something into the text box.',
      instruction: 'Type something here',
      taskKey: 'T0',
      text_tags: ['insertion', 'deletion'],
      type: 'text',
      updateAnnotation: sinon.stub()
    }
  ]
  const dark = boolean('Dark theme', false)
  const loadingState = select('Subject loading', asyncStates, asyncStates.success)
  const subjectReadyState = select('Subject loading', asyncStates, asyncStates.success)
  const isThereTaskHelp = boolean('Enable task help', true)
  const store = Object.assign({}, mockStore, {
    subjectViewer: {
      loadingState
    },
    workflows: {
      loadingState: asyncStates.success
    },
    workflowSteps: {
      activeStepTasks: tasks,
      isThereANextStep: () => false,
      isThereAPreviousStep: () => false,
      isThereTaskHelp: true
    }
  })
  return (
    <MockTask
      dark={dark}
      isThereTaskHelp={isThereTaskHelp}
      loadingState={asyncStates.success}
      step={step}
      store={store}
      subjectReadyState={subjectReadyState}
      tasks={tasks}
      zooTheme={zooTheme}
    />
  )
})