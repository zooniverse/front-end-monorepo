import { withKnobs, boolean, select } from '@storybook/addon-knobs'
import asyncStates from '@zooniverse/async-states'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import React from 'react'
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
.add('single answer question', function () {
  const step = null
  const tasks = [{
    answers: [{ label: 'yes' }, { label: 'no' }],
    question: 'Is there a cat?',
    help: 'Choose an answer from the choices given, then press Done.',
    required: true,
    taskKey: 'init',
    type: 'single'
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