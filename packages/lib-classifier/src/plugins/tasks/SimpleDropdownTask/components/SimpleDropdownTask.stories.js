import { withKnobs, boolean, radios, select } from '@storybook/addon-knobs'
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

storiesOf('Tasks / Simple Dropdown Task', module)
  .addDecorator(withKnobs)
  .addParameters({
    viewport: {
      defaultViewport: 'responsive'
    }
  })
  .add('light theme', function () {
    const simpleDropdownTask = {
      instruction: 'Choose your favourite colour',
      allowCreate: false,
      options: [
        'Red',
        'Blue',
        'Yellow',
        'Green',
        'White',
        'Black',
      ],
      required: radios('Required', { true: 'true', false: '' }, ''),
      taskKey: 'init',
      type: 'dropdown-simple',
    }
    const tasks = {
      init: simpleDropdownTask
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
          subjectViewer={store.subjectViewer}
        />
      </Provider>
    )
  })
