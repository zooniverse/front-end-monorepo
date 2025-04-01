import { observer } from 'mobx-react'

import { useStores } from '@hooks'
import DoneAndTalkButton from './DoneAndTalkButton'

function storeMapper(classifierStore) {
  const {
    classifications: {
      completeClassification
    },
    subjects: {
      active: subject
    },
    workflowSteps: {
      shouldWeShowDoneAndTalkButton
    }
  } = classifierStore

  if (subject?.stepHistory) { // stepHistory is not ready while the subject is loading
    const { finish, hasNextStep } = subject.stepHistory

    const visible = (!hasNextStep && shouldWeShowDoneAndTalkButton)

    function onClick(event) {
      event.preventDefault()
      subject.openInTalk()
      finish()
      return completeClassification()
    }

    return {
      onClick,
      visible
    }
  }

  return {}
}

function DoneAndTalkConnector(props) {
  const { onClick, visible } = useStores(storeMapper)

  return visible ? <DoneAndTalkButton onClick={onClick} {...props} /> : null
}

export default observer(DoneAndTalkConnector)
