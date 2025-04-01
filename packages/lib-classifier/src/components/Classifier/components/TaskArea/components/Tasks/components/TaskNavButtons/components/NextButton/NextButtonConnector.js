import { observer } from 'mobx-react'

import { useStores } from '@hooks'
import NextButton from './NextButton.js'

function storeMapper(classifierStore) {
  const {
    subjects: {
      active: subject
    },
    workflowSteps: {
      active: step
    }
  } = classifierStore

  if (subject?.stepHistory) { // stepHistory is not ready when subject is loading
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

function NextButtonConnector(props) {
  const { hasNextStep, onClick } = useStores(storeMapper)

  return hasNextStep ? <NextButton onClick={onClick} {...props} /> : null
}

export default observer(NextButtonConnector)
