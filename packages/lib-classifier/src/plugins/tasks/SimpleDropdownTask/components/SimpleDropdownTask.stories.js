import { withKnobs, boolean, radios, select } from '@storybook/addon-knobs'
import asyncStates from '@zooniverse/async-states'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import React from 'react'
import { Box, Grommet } from 'grommet'
import { Provider, observer } from 'mobx-react'
import { Tasks } from '../../../../components/Classifier/components/TaskArea/components/Tasks/Tasks'
import { createStore } from '@plugins/tasks/helpers'

const store = createStore()
function addStepToStore(step, tasks) {
  const steps = [['S1', step]]
  store.workflowSteps.setStepsAndTasks({ steps, tasks })
  store.workflowSteps.active.tasks.forEach(task => store.classifications.addAnnotation(task))
}

const ObservedTasks = observer(Tasks)

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
        <ObservedTasks
          {...taskProps}
        />
      </Box>
    </Grommet>
  )
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
        />
      </Provider>
    )
  })
