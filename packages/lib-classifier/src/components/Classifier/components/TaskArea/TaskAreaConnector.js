import React, { useContext } from 'react'
import { MobXProviderContext, observer } from 'mobx-react'
import TaskArea from './TaskArea'

function storeMapper (store) {
  const {
    subjects: {
      active: subject
    },
    tutorials: {
      disableTutorialTab,
      setActiveTutorial
    },
    workflows: {
      active: workflow
    }
  } = store

  return {
    disableTutorialTab,
    setActiveTutorial,
    subject,
    workflow
  }
}

function TaskAreaConnector(props) {
  const { classifierStore } = useContext(MobXProviderContext)
  const {
    disableTutorialTab = true,
    setActiveTutorial = () => true,
    subject,
    workflow
  } = storeMapper(classifierStore)

  return (
    <TaskArea
      disableTutorialTab={disableTutorialTab}
      setActiveTutorial={setActiveTutorial}
      subject={subject}
      workflow={workflow}
      {...props}
    />
  )
}

export default observer(TaskAreaConnector)