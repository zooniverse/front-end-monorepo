import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

import { useStores } from '@hooks'
import RotateButton from './RotateButton'

function storeMapper (classifierStore) {
  const {
    disableImageToolbar,
    rotate,
    rotationEnabled,
    separateFramesView
  } = classifierStore.subjectViewer

  const disabled = disableImageToolbar
  const show = rotationEnabled

  return {
    show,
    rotate,
    separateFramesView,
    show
  }
}

function RotateButtonContainer({ separateFrameRotate = () => true }) {
  const { disabled, rotate, separateFramesView, show } = useStores(storeMapper)

  if (!show) {
    return null
  }

  return (
    <RotateButton
      disabled={disabled}
      onClick={separateFramesView ? separateFrameRotate : rotate}
    />
  )
}

RotateButtonContainer.propTypes = {
  /** Used when separate frames of a subject each have their own ImageToolbar */
  separateFrameRotate: PropTypes.func
}

export default observer(RotateButtonContainer)
