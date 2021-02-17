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

storiesOf('Tasks / Data Visualization Annotation', module)
  .addDecorator(withKnobs)
  .addParameters({
    viewport: {
      defaultViewport: 'responsive'
    }
  })
  .add('light theme', function () {
    const tasks = {
      T4: {
        instruction: 'Do you spot a transit?',
        taskKey: 'T4',
        tools: [
          {
            help: '',
            label: 'Transit?',
            type: 'graph2dRangeX'
          }
        ],
        type: 'dataVisAnnotation'
      }
    }
    const step = {
      stepKey: 'S1',
      taskKeys: ['T4']
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