import { withStores } from '@helpers'

import DoneAndTalkButton from './DoneAndTalkButton'

function storeMapper(store) {
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
  } = store

  let visible = false
  if (subject?.stepHistory) {
    const { finish, hasNextStep } = subject.stepHistory

    visible = (!hasNextStep && shouldWeShowDoneAndTalkButton)

    function onClick(event) {
      event.preventDefault()
      const isCmdClick = event.metaKey
      subject.openInTalk(isCmdClick)
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

export default withStores(DoneAndTalkButton, storeMapper)
