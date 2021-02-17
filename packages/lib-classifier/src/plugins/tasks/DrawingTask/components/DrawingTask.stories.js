import { withKnobs, boolean, select } from '@storybook/addon-knobs'
import asyncStates from '@zooniverse/async-states'
import zooTheme from '@zooniverse/grommet-theme'
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

storiesOf('Tasks / Drawing Task', module)
  .addDecorator(withKnobs)
  .addParameters({
    viewport: {
      defaultViewport: 'responsive'
    }
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
          subjectViewer={store.subjectViewer}
        />
      </Provider>
    )
  })