import { withKnobs, boolean, radios, select } from '@storybook/addon-knobs'
import asyncStates from '@zooniverse/async-states'
import { storiesOf } from '@storybook/react'
import React from 'react'
import { Provider } from 'mobx-react'
import { MockTask } from '@helpers'
import { createStore }  from '@store/helpers'

const store = createStore()
function addStepToStore (step, tasks) {
  const steps = [ ['S1', step] ]
  store.workflowSteps.setStepsAndTasks({ steps, tasks })
  store.workflowSteps.active.tasks.forEach(task => store.classifications.addAnnotation(task))
}

storiesOf('Tasks / General', module)
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
  .add('multiple tasks', function () {
    const tasks = {
      init: {
        answers: [{ label: 'yes' }, { label: 'no' }],
        help: 'Choose an answer from the choices given, then press Done.',
        question: 'Is there a cat?',
        required: radios('Required', { true: 'true', false: '' }, ''),
        taskKey: 'init',
        type: 'single'
      },
      T1: {
        answers: [{ label: 'sleeping' }, { label: 'playing' }, { label: 'looking indifferent' }],
        help: 'Pick as many answers as apply, then press Done.',
        question: 'What is it doing?',
        required: radios('Required', { true: 'true', false: '' }, ''),
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
          subjectViewer={store.subjectViewer}
        />
      </Provider>
    )
  })