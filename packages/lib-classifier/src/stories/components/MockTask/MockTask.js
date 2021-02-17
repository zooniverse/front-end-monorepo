import { Box, Grommet } from 'grommet'
import { Provider, observer } from 'mobx-react'
import React from 'react'
import { Tasks } from '@components/Classifier/components/TaskArea/components/Tasks/Tasks'
import asyncStates from '@zooniverse/async-states'
import zooTheme from '@zooniverse/grommet-theme'
import { createStore }  from '@store/helpers'

let store

const ObservedTasks = observer(Tasks)

function addStepToStore(step, tasks) {
  const steps = [['S1', step]]
  store.workflowSteps.setStepsAndTasks({ steps, tasks })
  store.workflowSteps.active.tasks.forEach(task => store.classifications.addAnnotation(task))
}

function initStore() {
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
  const newStore = createStore()
  newStore.classifications.createClassification(mockSubject, mockWorkflow, mockProject)
  return newStore
}

export default function MockTask(props) {
  const { dark, step, tasks, ...taskProps } = props
  store = store ?? initStore()
  addStepToStore(step, tasks)
  const { subjectViewer } = store
  switch (taskProps.subjectReadyState) {
    case asyncStates.error: {
      subjectViewer.onError()
      break
    }
    case asyncStates.loading: {
      subjectViewer.resetSubject()
      break
    }
    case asyncStates.success: {
      subjectViewer.onSubjectReady()
      break
    }
  }

  return (
    <Provider classifierStore={store}>
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
            classification={store.classifications.active}
            loadingState={asyncStates.success}
            step={store.workflowSteps.active}
            subjectViewer={store.subjectViewer}
            {...taskProps}
          />
        </Box>
      </Grommet>
    </Provider>
  )
}