import { observer } from 'mobx-react'
import { useState } from 'react'
import PropTypes from 'prop-types'

import { useStores } from '@hooks'
import ZoomOutButton from './ZoomOutButton'

function storeMapper(classifierStore) {
  const { separateFramesView, zoomOut } = classifierStore.subjectViewer

  return {
    separateFramesView,
    zoomOut
  }
}

function ZoomOutButtonContainer({ separateFrameZoomOut = () => true }) {
  const { separateFramesView, zoomOut } = useStores(storeMapper)
  const [timer, setTimer] = useState('')

  function onPointerDown(event) {
    const { currentTarget, pointerId } = event
    zoomOut()
    clearInterval(timer)
    const newTimer = setInterval(zoomOut, 100)
    setTimer(newTimer)
    currentTarget.setPointerCapture(pointerId)
  }

  function onPointerUp(event) {
    const { currentTarget, pointerId } = event
    clearInterval(timer)
    currentTarget.releasePointerCapture(pointerId)
  }

  return (
    <ZoomOutButton
      onClick={separateFramesView ? separateFrameZoomOut : zoomOut}
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
