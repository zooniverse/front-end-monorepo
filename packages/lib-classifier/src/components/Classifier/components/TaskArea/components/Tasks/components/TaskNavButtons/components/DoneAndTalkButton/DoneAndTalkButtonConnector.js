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

  let visible = false
  if (subject?.stepHistory) {
    const { finish, hasNextStep } = subject.stepHistory

    visible = (!hasNextStep && shouldWeShowDoneAndTalkButton)

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
}

function DoneAndTalkConnector(props) {
  const { onClick, visible } = useStores(storeMapper)

  return visible ? <DoneAndTalkButton onClick={onClick} {...props} /> : null
}

export default observer(DoneAndTalkConnector)
