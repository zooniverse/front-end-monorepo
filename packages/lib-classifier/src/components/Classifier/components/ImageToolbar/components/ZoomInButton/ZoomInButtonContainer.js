import { observer } from 'mobx-react'
import { useState } from 'react'
import PropTypes from 'prop-types'

import { useStores } from '@hooks'
import { useZoom } from '@plugins/drawingTools/shared/ZoomContext'

import ZoomInButton from './ZoomInButton'

function storeMapper(classifierStore) {
  const {
    disableImageToolbar
  } = classifierStore.subjectViewer

  return {
    disabled: disableImageToolbar
  }
}

function ZoomInButtonContainer({ separateFrameZoomIn }) {
  const { disabled } = useStores(storeMapper)
  const { zoomIn } = useZoom()
  const [timer, setTimer] = useState('')

  const zoomCallback = separateFrameZoomIn || zoomIn

  function onClick() {
    clearInterval(timer)
    zoomCallback()
  }

  function onPointerDown(event) {
    const { currentTarget, pointerId } = event
    clearInterval(timer)
    const newTimer = setInterval(zoomCallback, 100)
    setTimer(newTimer)
    currentTarget.setPointerCapture(pointerId)
  }

  function onPointerUp(event) {
    const { currentTarget, pointerId } = event
    currentTarget.releasePointerCapture(pointerId)
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
