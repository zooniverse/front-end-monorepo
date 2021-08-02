import React from 'react'
import { observer } from 'mobx-react'

import { useStores } from '@helpers'
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

function TaskAreaConnector(props) {
  const {
    disableTutorialTab = true,
    setActiveTutorial = () => true,
    subject,
    tutorial,
    workflow
  } = useStores(storeMapper)

  return (
    <TaskArea
      disableTutorialTab={disableTutorialTab}
      setActiveTutorial={setActiveTutorial}
      subject={subject}
      tutorial={tutorial}
      workflow={workflow}
      {...props}
    />
  )
}

export default observer(TaskAreaConnector)