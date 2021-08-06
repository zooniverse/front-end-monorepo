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
    disableTutorialTab,
    setActiveTutorial,
    subject,
    tutorial,
    workflow
  }
}

export default withStores(TaskArea, storeMapper)
