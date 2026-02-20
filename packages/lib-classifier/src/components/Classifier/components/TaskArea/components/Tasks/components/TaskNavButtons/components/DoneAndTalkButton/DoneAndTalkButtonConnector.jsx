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
      hasUnsupportedTasks,
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
      disabled: hasUnsupportedTasks,
      onClick,
      talkURL: subject.talkURL,
      visible
    }
  }

  return {}
}

function DoneAndTalkConnector(props) {
  const { disabled, onClick, talkURL, visible } = useStores(storeMapper)
  const isDisabled = disabled || props.disabled

  return visible ? <DoneAndTalkButton {...props} disabled={isDisabled} onClick={onClick} talkURL={talkURL} /> : null
}

export default observer(DoneAndTalkConnector)
