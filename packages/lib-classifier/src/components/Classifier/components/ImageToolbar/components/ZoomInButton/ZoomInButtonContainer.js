import PropTypes from 'prop-types'
import { useState } from 'react'

import { withStores } from '@helpers'
import ZoomInButton from './ZoomInButton'

function storeMapper(classifierStore) {
  const { zoomIn } = classifierStore.subjectViewer

  return {
    zoomIn
  }
}

function ZoomInButtonContainer({ zoomIn = () => console.log('zoom in') }) {
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
      onClick={zoomIn}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    />
  )
}

ZoomInButtonContainer.propTypes = {
  zoomIn: PropTypes.func
}

export default withStores(ZoomInButtonContainer, storeMapper)
