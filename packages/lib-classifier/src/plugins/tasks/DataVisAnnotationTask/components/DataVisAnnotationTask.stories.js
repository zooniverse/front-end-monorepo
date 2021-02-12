import { withKnobs, boolean, select } from '@storybook/addon-knobs'
import asyncStates from '@zooniverse/async-states'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import React from 'react'
import { Box, Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import { Tasks } from '../../../../components/Classifier/components/TaskArea/components/Tasks/Tasks'
import { createStore } from '@plugins/tasks/helpers'

const store = createStore()
function addStepToStore(step, tasks) {
  const steps = [['S1', step]]
  store.workflowSteps.setStepsAndTasks({ steps, tasks })
  store.workflowSteps.active.tasks.forEach(task => store.classifications.addAnnotation(task))
}

function MockTask(props) {
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
        />
      </Provider>
    )
  })