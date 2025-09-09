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

    function onClick() {
      finish()
      return completeClassification({ doneAndTalk: true })
    }

    return {
      onClick,
      talkURL: subject.talkURL,
      visible
    }
  }

  return {}
}

function DoneAndTalkConnector(props) {
  const { onClick, talkURL, visible } = useStores(storeMapper)

  return visible ? <DoneAndTalkButton onClick={onClick} {...props} talkURL={talkURL} /> : null
}

export default observer(DoneAndTalkConnector)
