import { observer } from 'mobx-react'
import { useStores } from '@hooks'
import SGVDoneAndTalkButton from './SGVDoneAndTalkButton'
import SubjectGroupModal from '../../../../../../../SubjectGroupModal/SubjectGroupModal'

function storeMapper(classifierStore) {
  const {
    classifications: {
      completeClassification
    },
    projects: {
      active: project
    },
    subjects: {
      active: subject
    },
    workflows: {
      active: workflow
    },
    workflowSteps: {
      shouldWeShowDoneAndTalkButton
    }
  } = classifierStore

  if (subject?.stepHistory && workflow) {
    const { finish, hasNextStep } = subject.stepHistory
    const visible = (!hasNextStep && shouldWeShowDoneAndTalkButton)

    return {
      completeClassification,
      finish,
      project,
      subject,
      visible,
      workflow
    }
  }

  return {}
}

function SGVDoneAndTalkButtonConnector(props) {
  const { completeClassification, finish, project, subject, visible, workflow } = useStores(storeMapper)

  if (!visible || !workflow) return null

  function onClick() {
    // Extract plain data from MobX objects immediately
    const subjectData = {
      project: {
        slug: project?.slug || ''
      },
      subjectIds: subject.subjectIds ? [...subject.subjectIds] : [],
      locations: subject.locations ? subject.locations.map(loc => ({ url: loc.url })) : []
    }

    workflow.setSGVModalState(true, subjectData)
    finish()
    return completeClassification({ doneAndTalk: true })
  }

  function onCloseModal() {
    workflow.setSGVModalState(false, null)
  }

  return (
    <>
      <SGVDoneAndTalkButton onClick={onClick} {...props} />
      {workflow.SGVModalState.showModal && workflow.SGVModalState.lastSubject && (
        <SubjectGroupModal
          active={workflow.SGVModalState.showModal}
          closeFn={onCloseModal}
          subject={workflow.SGVModalState.lastSubject}
          workflowConfiguration={workflow.configuration}
        />
      )}
    </>
  )
}

export default observer(SGVDoneAndTalkButtonConnector)