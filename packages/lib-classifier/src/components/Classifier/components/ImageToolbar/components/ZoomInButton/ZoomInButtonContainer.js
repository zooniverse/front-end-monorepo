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

function ZoomInButtonContainer({ separateFrameZoomIn = () => true }) {
  const { disabled, separateFramesView, zoomIn } = useStores(storeMapper)
  const [timer, setTimer] = useState('')

  function onPointerDown(event) {
    const { currentTarget, pointerId } = event
    zoomIn()
    clearInterval(timer)
    const newTimer = setInterval(zoomIn, 100)
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
      onClick={separateFramesView ? separateFrameZoomIn : zoomIn}
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
