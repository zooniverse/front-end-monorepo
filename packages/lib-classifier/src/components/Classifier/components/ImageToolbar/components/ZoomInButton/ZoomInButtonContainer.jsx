import { observer } from 'mobx-react'
import { useState } from 'react'
import PropTypes from 'prop-types'

import { useStores } from '@hooks'
import ZoomInButton from './ZoomInButton'

function storeMapper(classifierStore) {
  const {
    disableImageToolbar,
    zoomIn
  } = classifierStore.subjectViewer

  return {
    disabled: disableImageToolbar,
    zoomIn
  }
}

function ZoomInButtonContainer({ separateFrameZoomIn }) {
  const { disabled, zoomIn } = useStores(storeMapper)
  const [timer, setTimer] = useState('')
  const zoomCallback = separateFrameZoomIn || zoomIn

  function onClick() {
    // Stop the zoom callback
    clearInterval(timer)
    zoomCallback()
  }

  function onPointerDown(event) {
    const { currentTarget, pointerId } = event
    clearInterval(timer)
    // Start the zoom callback running every 100ms
    const newTimer = setInterval(zoomCallback, 100)
    setTimer(newTimer)
    currentTarget.setPointerCapture(pointerId)
  }

  function onPointerUp(event) {
    const { currentTarget, pointerId } = event
    currentTarget.releasePointerCapture(pointerId)
    // Stop the zoom callback
    clearInterval(timer)
    setTimer('')
  }

  return (
    <ZoomInButton
      disabled={disabled}
      onClick={onClick}
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
