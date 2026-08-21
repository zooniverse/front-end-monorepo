import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

import { useStores } from '@hooks'
import RotateButton from './RotateButton'

function storeMapper (classifierStore) {
  const {
    disableImageToolbar,
    rotate,
    rotationEnabled
  } = classifierStore.subjectViewer

  const disabled = disableImageToolbar
  const show = rotationEnabled

  return {
    disabled,
    rotate,
    show
  }
}

function RotateButtonContainer({ overrideDisabled, separateFrameRotate }) {
  const { disabled, rotate, show } = useStores(storeMapper)

  const rotateCallback = separateFrameRotate || rotate
  const _disabled = overrideDisabled ?? disabled

  if (!show) {
    return null
  }

  return (
    <RotateButton
      disabled={_disabled}
      onClick={rotateCallback}
    />
  )
}

RotateButtonContainer.propTypes = {
  /** Overrides the 'disabled' value, which is usually determined by the Subject Viewer Store's disableImageToolbar */
  overrideDisabled: PropTypes.bool,
  /** Used when separate frames of a subject each have their own ImageToolbar */
  separateFrameRotate: PropTypes.func
}

export default observer(RotateButtonContainer)
