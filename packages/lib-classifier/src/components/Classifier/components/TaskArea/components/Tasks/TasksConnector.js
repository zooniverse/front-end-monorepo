import React from 'react'
import { withStores } from '@helpers'
import Tasks from './Tasks'

function storeMapper(store) {
  const {
    classifications: {
      active: classification,
      demoMode
    },
    subjects: {
      active: subject
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
  const latest = subject?.stepHistory.latest
  // wait for the step and the classification before calculating isComplete from annotations.
  if (step && latest) {
    isComplete = step.isComplete(latest.annotations)
  }

  return {
    classification,
    demoMode,
    isComplete,
    isThereTaskHelp,
    loadingState,
    step,
    subjectReadyState
  }
}

export default withStores(Tasks, storeMapper)
