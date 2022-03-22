import { MobXProviderContext, observer } from 'mobx-react'
import React from 'react'

import AlreadySeenBanner from './components/AlreadySeenBanner'
import RetiredBanner from './components/RetiredBanner'
import SubjectSetProgressBanner from './components/SubjectSetProgressBanner'
import WorkflowIsFinishedBanner from './components/WorkflowIsFinishedBanner'
import UserHasFinishedWorkflowBanner from './components/UserHasFinishedWorkflowBanner'

function useStores(stores) {
  const { classifierStore } = stores ?? React.useContext(MobXProviderContext)
  return {
    project: classifierStore.projects.active,
    subject: classifierStore.subjects.active,
    subjects: classifierStore.subjects,
    workflow: classifierStore.workflows.active
  }
}

function Banners({ stores }) {
  const { project, subject, subjects, workflow } = useStores(stores)
  const subjectNumber = subject?.priority ?? -1

  const hasIndexedSubjects = workflow?.hasIndexedSubjects
  const hasGroupedOrderedSubjects = workflow?.grouped && workflow?.prioritized
  // Next/Prev buttons are only enabled when Project has the experimental tool enabled AND the Subject Set is indexed.
  const enableIndexedSubjectSetNextPrevButtons =
    project?.experimental_tools?.includes('indexedSubjectSetNextPrevButtons')
  const onPrevious = subjects.previousIndexed
  const onNext = subjects.nextIndexed

  if (enableIndexedSubjectSetNextPrevButtons && hasIndexedSubjects && subjectNumber > -1) {
    return (
      <SubjectSetProgressBanner
        checkForProgress={subject?.stepHistory?.checkForProgress}
        onNext={onNext}
        onPrevious={onPrevious}
        subject={subject}
        workflow={workflow}
      />
    )
  }
  if (hasGroupedOrderedSubjects && subjectNumber > -1) {
    return (
      <SubjectSetProgressBanner
        subject={subject}
        workflow={workflow}
      />
    )
  }
  return (
    <>
      <AlreadySeenBanner subject={subject} />
      <RetiredBanner subject={subject} />
      <WorkflowIsFinishedBanner subject={subject} />
      <UserHasFinishedWorkflowBanner subject={subject} />
    </>
  )
}

export default observer(Banners)
