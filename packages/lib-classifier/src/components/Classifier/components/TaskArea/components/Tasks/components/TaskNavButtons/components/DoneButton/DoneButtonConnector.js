import { observer } from 'mobx-react'

import { useStores } from '@hooks'
import DoneButton from './DoneButton'

function storeMapper(classifierStore) {
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
  } = classifierStore

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
}

function DoneButtonConnector(props) {
  const { hasNextStep, onClick } = useStores(storeMapper)
  return hasNextStep ? null : <DoneButton onClick={onClick} {...props} />
}

export default observer(DoneButtonConnector)
