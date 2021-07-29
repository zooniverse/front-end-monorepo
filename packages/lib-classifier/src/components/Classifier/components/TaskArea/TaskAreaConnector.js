import * as React from 'react'
import { MobXProviderContext, observer } from 'mobx-react'
import TaskArea from './TaskArea'

function useStores(store) {
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
  const { classifierStore } = React.useContext(MobXProviderContext)
  const {
    disableTutorialTab = true,
    setActiveTutorial = () => true,
    subject,
    tutorial,
    workflow
  } = useStores(classifierStore)

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