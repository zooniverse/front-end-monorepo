import { observer } from 'mobx-react'
import { useState } from 'react'
import PropTypes from 'prop-types'

import { useStores } from '@hooks'
import { usePanZoom } from '@plugins/drawingTools/shared/PanZoomContext'

import ZoomOutButton from './ZoomOutButton'

function storeMapper(classifierStore) {
  const {
    disableImageToolbar
  } = classifierStore.subjectViewer

  return {
    disabled: disableImageToolbar
  }
}

function ZoomOutButtonContainer({ separateFrameZoomOut }) {
  const { disabled } = useStores(storeMapper)
  const { zoomOut } = usePanZoom()
  const [timer, setTimer] = useState('')
  const zoomCallback = separateFrameZoomOut || zoomOut

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
