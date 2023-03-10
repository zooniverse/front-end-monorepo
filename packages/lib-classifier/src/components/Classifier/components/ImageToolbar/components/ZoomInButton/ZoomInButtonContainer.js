import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { useState } from 'react'

import { useStores } from '@hooks'
import ZoomInButton from './ZoomInButton'

function storeMapper(classifierStore) {
  const { zoomIn } = classifierStore.subjectViewer

  return {
    zoomIn
  }
}

function ZoomInButtonContainer() {
  const { zoomIn } = useStores(storeMapper)
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

export default observer(ZoomInButtonContainer)
