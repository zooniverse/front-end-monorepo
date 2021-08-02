import React from 'react'
import { observer } from 'mobx-react'

import { useStores } from '@helpers'
import Tasks from './Tasks'

function storeMapper(store) {
  const {
    annotatedSteps: {
      latest
    },
    classifications: {
      active: classification,
      demoMode
    },
    subjectViewer: {
      loadingState: subjectReadyState
    },
    workflows: {
      loadingState
    },
    workflowSteps: {
      active: step,
      isThereTaskHelp
    }
  } = store

  return {
    classification,
    demoMode,
    isThereTaskHelp,
    latest,
    loadingState,
    step,
    subjectReadyState
  }
}

function TasksConnector(props) {
  const {
    classification,
    demoMode,
    isThereTaskHelp,
    latest,
    loadingState,
    step,
    subjectReadyState
  } = useStores(storeMapper)

  let isComplete
  // wait for the step and the classification before calculating isComplete from annotations.
  if (step && classification) {
    isComplete = step.isComplete(latest.annotations)
  }

  return (
    <Tasks
      classification={classification}
      demoMode={demoMode}
      isComplete={isComplete}
      isThereTaskHelp={isThereTaskHelp}
      loadingState={loadingState}
      step={step}
      subjectReadyState={subjectReadyState}
      {...props}
    />
  )
}

export default observer(TasksConnector)
