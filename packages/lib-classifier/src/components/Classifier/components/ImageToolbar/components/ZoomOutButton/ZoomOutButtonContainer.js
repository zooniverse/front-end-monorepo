import PropTypes from 'prop-types'
import { useState } from 'react'

import { withStores } from '@helpers'
import ZoomOutButton from './ZoomOutButton'

function storeMapper(classifierStore) {
  const { zoomOut } = classifierStore.subjectViewer

  return {
    zoomOut
  }
}

function ZoomOutButtonContainer({ zoomOut = () => console.log('zoom out') }) {
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
      onClick={zoomOut}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    />
  )
}

ZoomOutButtonContainer.propTypes = {
  zoomOut: PropTypes.func
}

export default withStores(ZoomOutButtonContainer, storeMapper)
