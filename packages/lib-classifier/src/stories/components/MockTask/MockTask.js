import { Box, Grommet } from 'grommet'
import { Provider, observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { Tasks } from '@components/Classifier/components/TaskArea/components/Tasks/Tasks'
import asyncStates from '@zooniverse/async-states'
import zooTheme from '@zooniverse/grommet-theme'
import { createStore }  from '@store/helpers'

let store
const ObservedTasks = observer(Tasks)

function addStepToStore(tasks = {}) {
  const stepKey = 'S1'
  const taskKeys = Object.values(tasks).map(task => task.taskKey)
  const step = {
    stepKey,
    taskKeys
  }
  const steps = [[stepKey, step]]
  store.workflowSteps.setStepsAndTasks({ steps, tasks })
  store.workflowSteps.active.tasks.forEach(task => store.classifications.addAnnotation(task))
}

/**
  Initialise the store state on story load.
*/
function initStore(tasks) {
  store = store ?? createStore()
  addStepToStore(tasks)
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
  store.classifications.createClassification(mockSubject, mockWorkflow, mockProject)
}

export default function MockTask({ dark, subjectReadyState, tasks, ...taskProps }) {
  const [ loaded, setLoaded ] = useState(false)

  useEffect(function init() {
    initStore(tasks)
    setLoaded(true)
  }, [])

  useEffect(function onSubjectReadyStateChange() {
    const { subjectViewer } = store
    switch (subjectReadyState) {
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
  }, [subjectReadyState])

  if (!loaded) {
    return null
  }

  const classification = store?.classifications?.active
  const step = store?.workflowSteps?.active

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
            classification={classification}
            loadingState={asyncStates.success}
            step={step}
            subjectReadyState={subjectReadyState}
            {...taskProps}
          />
        </Box>
      </Grommet>
    </Provider>
  )
}