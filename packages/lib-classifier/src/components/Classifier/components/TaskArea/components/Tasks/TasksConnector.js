import React from 'react'
import { withStores } from '@helpers'
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

  let isComplete
  // wait for the step and the classification before calculating isComplete from annotations.
  if (step && classification) {
    isComplete = step.isComplete(latest.annotations)
  }

  return {
    classification,
    demoMode,
    isComplete,
    isThereTaskHelp,
    latest,
    loadingState,
    step,
    subjectReadyState
  }
}

export default withStores(Tasks, storeMapper)
