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
      tutorial
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
    tutorial,
    workflow
  }
}

export default withStores(TaskArea, storeMapper)
