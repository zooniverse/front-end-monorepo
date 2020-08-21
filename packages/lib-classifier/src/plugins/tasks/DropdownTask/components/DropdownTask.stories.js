import { withKnobs, boolean, select } from '@storybook/addon-knobs'
import asyncStates from '@zooniverse/async-states'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { types } from 'mobx-state-tree'
import React from 'react'
import { Box, Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import { Tasks } from '../../../../components/Classifier/components/TaskArea/components/Tasks/Tasks'
import ClassificationStore from '@store/ClassificationStore'
import SubjectStore from '@store/SubjectStore'
import WorkflowStore from '@store/WorkflowStore'
import WorkflowStepStore from '@store/WorkflowStepStore'

function createStore() {
  const classifications = ClassificationStore.create()
  const mockSubject = {
    id: 'subject',
    metadata: {}
  }
  const mockWorkflow = {
    id: 'workflow',
    version: '1.0'
  }
  const mockProject = {
    id: 'project'
  }

  const store = types.model('MockStore', {
    classifications: ClassificationStore,
    subjects: SubjectStore,
    workflows: WorkflowStore,
    workflowSteps: WorkflowStepStore
  })
    .create({
      classifications,
      subjects: SubjectStore.create({}),
      workflows: WorkflowStore.create({}),
      workflowSteps: WorkflowStepStore.create({})
    })
  classifications.createClassification(mockSubject, mockWorkflow, mockProject)
  return store
}

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

const dropdownTask = {
  instruction: 'Choose your favourite things.',
  selects: [{
    allowCreate: false,
    id: 'dropdown-select-1',
    options: {
      '*': [
        {
          label: 'Red',
          value: 'hashed-value-R',
        },
        {
          label: 'Green',
          value: 'hashed-value-G',
        },
        {
          label: 'Blue',
          value: 'hashed-value-B',
        },
      ],
    },
    required: false,
    title: 'Favourite colour',
  }],
  required: false,
  taskKey: 'init',
  type: 'dropdown',
}

storiesOf('Tasks | Dropdown Task', module)
  .addDecorator(withKnobs)
  .addParameters({
    viewport: {
      defaultViewport: 'responsive'
    }
  })
  .add('light theme', function () {
    const tasks = {
      init: dropdownTask
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
