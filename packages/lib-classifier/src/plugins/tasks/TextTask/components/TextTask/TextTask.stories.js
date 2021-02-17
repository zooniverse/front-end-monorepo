import { withKnobs, boolean, select } from '@storybook/addon-knobs'
import asyncStates from '@zooniverse/async-states'
import { storiesOf } from '@storybook/react'
import React from 'react'
import { Provider } from 'mobx-react'
import { MockTask } from '@helpers'
import { createStore }  from '@store/helpers'

const store = createStore()
function addStepToStore(step, tasks) {
  const steps = [['S1', step]]
  store.workflowSteps.setStepsAndTasks({ steps, tasks })
  store.workflowSteps.active.tasks.forEach(task => store.classifications.addAnnotation(task))
}

storiesOf('Tasks / Text', module)
  .addDecorator(withKnobs)
  .addParameters({
    viewport: {
      defaultViewport: 'responsive'
    }
  })
.add('default', function () {
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
          subjectViewer={store.subjectViewer}
        />
      </Provider>
    )
  })
  .add('with suggestions', function () {
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
          subjectViewer={store.subjectViewer}
          subTaskPreviousAnnotationValues={['a', 'b', 'c']}
        />
      </Provider>
    )
  })