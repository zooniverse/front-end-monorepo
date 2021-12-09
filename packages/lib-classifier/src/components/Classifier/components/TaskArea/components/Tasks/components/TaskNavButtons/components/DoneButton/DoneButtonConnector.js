import { withStores } from '@helpers'

import DoneButton from './DoneButton'

function storeMapper(store) {
  const {
    subjects: {
      active: subject
    },
    classifications: {
      completeClassification
    },
    workflowSteps: {
      active: step
    }
  } = store

  if (subject?.stepHistory) {
    const { finish, hasNextStep, latest } = subject.stepHistory
    const annotations = latest?.annotations

    function onClick(event) {
      event.preventDefault()
      step.completeAndValidate(annotations)
      finish()
      return completeClassification()
    }

    return {
      hasNextStep,
      onClick
    }
  }

  return {}

}

export default withStores(DoneButton, storeMapper)
