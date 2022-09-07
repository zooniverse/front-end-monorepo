import React from 'react'
import { observer } from 'mobx-react'
import SubTaskPopup from './SubTaskPopup'

export default observer(function SubTaskPopupContainer ({
  activeMark,
  onDelete
}) {
  if (!activeMark || !activeMark.subTaskVisibility) return null

  return (
    <SubTaskPopup
      activeMark={activeMark}
      onDelete={onDelete}
    />
  )
})
