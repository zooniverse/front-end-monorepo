import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

import { useStores } from '@hooks'
import MoveButton from './MoveButton'

function storeMapper(classifierStore) {
  const {
    disableImageToolbar,
    enableMove,
    move,
    separateFramesView
  } = classifierStore.subjectViewer

  const disabled = disableImageToolbar

  return {
    disabled,
    enableMove,
    move,
    separateFramesView,
  }
}

function MoveButtonContainer({
  separateFrameMove = false,
  separateFrameEnableMove = () => true
}) {
  const { 
    disabled,
    enableMove,
    move, 
    separateFramesView
  } = useStores(storeMapper)

  return (
    <MoveButton
      active={separateFramesView ? separateFrameMove : move}
      disabled={disabled}
      onClick={separateFramesView ? separateFrameEnableMove : enableMove}
    />
  )
}

export default observer(MoveButtonContainer)

MoveButtonContainer.propTypes = {
  /** Used when separate frames of a subject each have their own ImageToolbar */
  separateFrameMove: PropTypes.bool,
  separateFrameEnableMove: PropTypes.func
}
