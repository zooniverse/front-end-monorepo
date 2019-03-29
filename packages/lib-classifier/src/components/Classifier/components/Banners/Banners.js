import { Stack } from 'grommet'
import React from 'react'

import AlreadySeenBanner from './components/AlreadySeenBanner'
import RetiredBanner from './components/RetiredBanner'
import WorkflowIsFinishedBanner from './components/WorkflowIsFinishedBanner'
import UserHasFinishedWorkflowBanner from './components/UserHasFinishedWorkflowBanner'

function Banners () {
  return (
    <>
      <AlreadySeenBanner />
      <RetiredBanner />
      <WorkflowIsFinishedBanner />
      <UserHasFinishedWorkflowBanner />
    </>
  )
}

export default Banners
