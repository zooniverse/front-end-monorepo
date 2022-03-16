import { Box, Grommet } from 'grommet'
import { Provider, observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import Tasks from '@components/Classifier/components/TaskArea/components/Tasks'
import asyncStates from '@zooniverse/async-states'
import zooTheme from '@zooniverse/grommet-theme'
import mockStore  from '@test/mockStore'
import { SubjectFactory, WorkflowFactory } from '@test/factories'

/**
  Global store. This should be created only once, otherwise the Provider will error.
*/
let store

/**
  Takes a workflow tasks object and sets up the active workflow step and classification annotations.
*/
function addStepToStore(taskSnapshots = {}, isThereTaskHelp = true) {
  const stepKey = 'S1'
  const taskKeys = Object.values(taskSnapshots).map(task => task.taskKey)
  const step = {
    stepKey,
    taskKeys
  }
  const steps = [[stepKey, step]]
  const tasks = {}
  Object.values(taskSnapshots).forEach(snapshot => {
    const task = Object.assign({}, snapshot)
    task.help = isThereTaskHelp ? task.help : undefined
    tasks[task.taskKey] = task
  })
  store.workflowSteps.reset()
  store.workflowSteps.setStepsAndTasks({ steps, tasks })
  store.subjects.active.stepHistory.start()
}

/**
  Initialise the store state on story load.
*/
function initStore (subject, tasks) {
  const workflow = WorkflowFactory.build(Object.assign({}, { tasks }))
  store = store ?? mockStore({ workflow })
  const mockSubject = Object.assign({}, subject, {
    id: 'subject',
    metadata: {}
  })
  const mockProject = {
    id: 'project'
  }
  const storeSubject = SubjectFactory.build(mockSubject)
  store.subjects.setResources([storeSubject])
  store.subjects.setActive(storeSubject.id)
  store.classifications.createClassification(mockSubject, workflow, mockProject)
}

/**
  Scaffolding to display a set of workflow tasks in a story, with a state store.
*/
export default function MockTask({
  /** Use the dark theme */
  dark = false,
  /** show task help */
  isThereTaskHelp = true,
  /** workflow loading state */
  loadingState = asyncStates.success,
  /** mock subject, pass props for the subject store */
  subject = {},
  /** subject loading state */
  subjectReadyState = asyncStates.success,
  /** a workflow tasks object */
  tasks,
  /** any other props to pass down to the tasks */
  ...taskProps
}) {
  const [ loaded, setLoaded ] = useState(false)

  useEffect(function init() {
    initStore(subject, tasks)
    setLoaded(true)
  }, [subject, tasks])

  useEffect(function onTasksChange() {
    addStepToStore(tasks, isThereTaskHelp)
  }, [isThereTaskHelp, tasks])

  useEffect(function onLoadingStateChange() {
    const { workflows } = store
    switch (loadingState) {
      case asyncStates.error: {
        workflows.onError()
        break
      }
      case asyncStates.loading: {
        workflows.onLoading()
        break
      }
      case asyncStates.success: {
        workflows.onReady()
        break
      }
    }
  }, [loadingState])

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
          <Tasks
            {...taskProps}
          />
        </Box>
      </Grommet>
    </Provider>
  )
}