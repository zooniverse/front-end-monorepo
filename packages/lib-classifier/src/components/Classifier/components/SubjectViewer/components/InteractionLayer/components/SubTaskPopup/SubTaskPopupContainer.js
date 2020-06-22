import React from 'react'
import PropTypes from 'prop-types'
import { observer, MobXProviderContext } from 'mobx-react'
import SubTaskPopup from './SubTaskPopup'

function useStores() {
  const stores = React.useContext(MobXProviderContext)
  const {
    activeStepTasks
  } = stores.classifierStore.workflowSteps

  const [activeInteractionTask] = activeStepTasks.filter(task => task.type === 'drawing' || task.type === 'transcription')
  const {
    activeMark
  } = activeInteractionTask
  return { activeMark }
}

export default observer(function SubTaskPopupContainer (props) {
  const {
    activeMark
  } = useStores()

  console.log('subTaskVisibility', activeMark?.subTaskVisibility)
  return (
    <SubTaskPopup
      activeMark={activeMark}
      subTaskMarkBounds={activeMark?.subTaskMarkBounds}
      subTaskVisibility={activeMark?.subTaskVisibility}
      subTaskPreviousAnnotations={activeMark?.subTaskPreviousAnnotations}
      setSubTaskVisibility={activeMark?.setSubTaskVisibility}
    />
  )
})
