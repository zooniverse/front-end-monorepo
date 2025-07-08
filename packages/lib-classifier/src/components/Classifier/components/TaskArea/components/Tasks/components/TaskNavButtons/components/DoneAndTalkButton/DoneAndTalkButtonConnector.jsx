import DoneAndTalkButton from './DoneAndTalkButton'
import { observer } from 'mobx-react'
import { useStores } from '@hooks'

function storeMapper(classifierStore) {
  const {
    classifications: {
      completeClassification
    },
    subjects: {
      active: subject
    },
    workflows: {
      active: {
        configuration: workflowConfiguration
      }
    },
    workflowSteps: {
      shouldWeShowDoneAndTalkButton
    }
  } = classifierStore

  if (subject?.stepHistory) { // stepHistory is not ready while the subject is loading
    const { finish, hasNextStep } = subject.stepHistory

    const visible = (!hasNextStep && shouldWeShowDoneAndTalkButton)

    function onClick(e) {
      // SubjectGroup: Prevent Done&Talk auto-routing & enable Modal 
      if (workflowConfiguration.subject_viewer === 'subjectGroup') {
        e.preventDefault();
        workflowConfiguration.setSubjectGroupModalState(true);
      }
      finish()
      return completeClassification({ doneAndTalk: true })
    }

    return {
      onClick,
      subject,
      talkURL: subject.talkURL,
      workflowConfiguration,
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
