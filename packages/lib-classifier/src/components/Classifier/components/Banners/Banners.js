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
    subject: classifierStore.subjects.active,
    workflow: classifierStore.workflows.active
  }
}

function Banners({ stores }) {
  const { subject, workflow } = useStores(stores)
  const subjectNumber = subject?.metadata['#priority'] ?? -1
  if (workflow?.grouped && subjectNumber !== -1) {
    return (
      <SubjectSetProgressBanner
        subject={subject}
        workflow={workflow}
      />
    )
  }
  return (
    <>
      <AlreadySeenBanner />
      <RetiredBanner />
      <WorkflowIsFinishedBanner />
      <UserHasFinishedWorkflowBanner />
    </>
  )
}

export default observer(Banners)
