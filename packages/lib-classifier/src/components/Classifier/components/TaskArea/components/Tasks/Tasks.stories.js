import { withKnobs, boolean, select } from '@storybook/addon-knobs'
import asyncStates from '@zooniverse/async-states'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import React from 'react'
import sinon from 'sinon'
import { Grommet } from 'grommet'
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

storiesOf('Tasks', module)
.addDecorator(withKnobs)
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
    <Provider classifierStore={store}>
      <Grommet theme={Object.assign({}, zooTheme, { dark })}>
        <Tasks
          isThereTaskHelp={true}
          loadingState={asyncStates.success}
          step={step}
          subjectReadyState={subjectReadyState}
          tasks={tasks}
          theme={dark ? 'dark' : 'light'}
        />
      </Grommet>
    </Provider>
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
    <Provider classifierStore={store}>
      <Grommet theme={Object.assign({}, zooTheme, { dark })}>
        <Tasks
          isThereTaskHelp={true}
          loadingState={asyncStates.success}
          step={step}
          subjectReadyState={subjectReadyState}
          tasks={tasks}
          theme={dark ? 'dark' : 'light'}
        />
      </Grommet>
    </Provider>
  )
})