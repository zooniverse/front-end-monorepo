import { observer } from 'mobx-react'
import { useState } from 'react'
import PropTypes from 'prop-types'

import { useStores } from '@hooks'
import ZoomOutButton from './ZoomOutButton'

function storeMapper(classifierStore) {
  const {
    disableImageToolbar,
    zoomOut
  } = classifierStore.subjectViewer

  return {
    disabled: disableImageToolbar,
    zoomOut
  }
}

function ZoomOutButtonContainer({ separateFrameZoomOut }) {
  const { disabled, zoomOut } = useStores(storeMapper)
  const [timer, setTimer] = useState('')
  const zoomCallback = separateFrameZoomOut || zoomOut

  function onClick() {
    // stop the zoom callback
    clearInterval(timer)
    zoomCallback()
  }

  function onPointerDown(event) {
    const { currentTarget, pointerId } = event
    clearInterval(timer)
    // start the zoom callback running every 100s
    const newTimer = setInterval(zoomCallback, 100)
    setTimer(newTimer)
    currentTarget.setPointerCapture(pointerId)
  }

  function onPointerUp(event) {
    const { currentTarget, pointerId } = event
    currentTarget.releasePointerCapture(pointerId)
    // stop the zoom callback
    clearInterval(timer)
    setTimer('')
  }

  return (
    <ZoomOutButton
      disabled={disabled}
      onClick={onClick}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    />
  )
}

export default observer(ZoomOutButtonContainer)

ZoomOutButtonContainer.propTypes = {
  /** Used when separate frames of a subject each have their own ImageToolbar */
  separateFrameZoomOut: PropTypes.func
}
