import { withStores } from '@helpers'

import NextButton from './NextButton'

function storeMapper(store) {
  const {
    subjects: {
      active: subject
    },
    workflowSteps: {
      active: step
    }
  } = store

  if (subject?.stepHistory) {
    const { next, hasNextStep, latest } = subject.stepHistory
    const annotations = latest?.annotations

    function onClick() {
      step.completeAndValidate(annotations)
      next()
    }

    return {
      hasNextStep,
      onClick
    }
  }

  return {}
}

export default withStores(NextButton, storeMapper)
