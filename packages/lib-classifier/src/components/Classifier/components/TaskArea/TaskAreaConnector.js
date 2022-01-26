import React from 'react'
import { withStores } from '@helpers'
import TaskArea from './TaskArea'

function storeMapper(store) {
  const {
    subjects: {
      active: subject
    },
    tutorials: {
      disableTutorialTab,
      setActiveTutorial,
    },
    workflows: {
      active: workflow
    }
  } = store

  return {
    alreadySeen: subject?.alreadySeen,
    disableTutorialTab,
    setActiveTutorial,
    retired: subject?.retired,
    subject,
    tutorial: workflow?.tutorial,
    workflow
  }
}

export default withStores(TaskArea, storeMapper)
