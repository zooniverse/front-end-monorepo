import { observer } from 'mobx-react'
import { useState } from 'react'
import PropTypes from 'prop-types'

import { useStores } from '@hooks'
import ZoomInButton from './ZoomInButton'

function storeMapper(classifierStore) {
  const {
    disableImageToolbar,
    separateFramesView,
    zoomIn
  } = classifierStore.subjectViewer

  const disabled = disableImageToolbar

  return {
    disabled,
    separateFramesView,
    zoomIn
  }
}

function ZoomInButtonContainer({ separateFrameZoomIn }) {
  const { disabled, zoomIn } = useStores(storeMapper)
  const [timer, setTimer] = useState('')
  const zoomCallback = separateFrameZoomIn || zoomIn

  function onPointerDown(event) {
    const { currentTarget, pointerId } = event
    clearInterval(timer)
    const newTimer = setInterval(zoomCallback, 100)
    setTimer(newTimer)
    currentTarget.setPointerCapture(pointerId)
  }

  function onPointerUp(event) {
    const { currentTarget, pointerId } = event
    clearInterval(timer)
    currentTarget.releasePointerCapture(pointerId)
  }

  return (
    <ZoomInButton
      disabled={disabled}
      onClick={zoomCallback}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    />
  )
}

export default observer(ZoomInButtonContainer)

ZoomInButtonContainer.propTypes = {
  /** Used when separate frames of a subject each have their own ImageToolbar */
  separateFrameZoomIn: PropTypes.func
}
