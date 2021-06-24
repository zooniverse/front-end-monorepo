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
    }
  } = store

  return {
    disableTutorialTab,
    setActiveTutorial,
    subject
  }
}

function TaskAreaConnector(props) {
  const { classifierStore } = useContext(MobXProviderContext)
  const {
    disableTutorialTab = true,
    setActiveTutorial = () => true,
    subject
  } = storeMapper(classifierStore)

  return (
    <TaskArea
      disableTutorialTab={disableTutorialTab}
      setActiveTutorial={setActiveTutorial}
      subject={subject}
      {...props}
    />
  )
}

export default observer(TaskAreaConnector)