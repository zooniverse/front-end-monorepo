import React from 'react'
import PropTypes from 'prop-types'
import { observer, MobXProviderContext } from 'mobx-react'
import SubTaskPopup from './SubTaskPopup'

function useStores() {
  const stores = React.useContext(MobXProviderContext)
  const {
    activeStepTasks
  } = stores.classifierStore.workflowSteps

  const [activeInteractionTask = {}] = activeStepTasks.filter(task => task.type === 'drawing' || task.type === 'transcription')
  const {
    activeMark
  } = activeInteractionTask
  return { activeMark }
}

export default observer(function SubTaskPopupContainer (props) {
  const {
    activeMark
  } = useStores()

  if (!activeMark || !activeMark.subTaskVisibility) return null

  return (
    <SubTaskPopup
      activeMark={activeMark}
    />
  )
})
