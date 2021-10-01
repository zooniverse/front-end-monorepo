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
    annotations: classifierStore.annotations,
    subject: classifierStore.subjects.active,
    subjects: classifierStore.subjects,
    workflow: classifierStore.workflows.active
  }
}

const environment = process.env.APP_ENV

function Banners({ stores }) {
  const { annotations, subject, subjects, workflow } = useStores(stores)
  const subjectNumber = subject?.priority ?? -1
  const hasIndexedSubjects = workflow?.hasIndexedSubjects
  const hasGroupedOrderedSubjects = workflow?.grouped && workflow?.prioritized
  if (environment !== 'production' && hasIndexedSubjects && subjectNumber > -1) {
    return (
      <SubjectSetProgressBanner
        annotations={annotations}
        onNext={subjects.nextIndexed}
        onPrevious={subjects.previousIndexed}
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
