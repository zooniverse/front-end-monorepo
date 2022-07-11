import React from 'react'
import PropTypes from 'prop-types'
import { observer, MobXProviderContext } from 'mobx-react'
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
