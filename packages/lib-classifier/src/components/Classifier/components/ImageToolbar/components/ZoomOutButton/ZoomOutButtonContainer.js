import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { useState } from 'react'

import { useStores } from '@hooks'
import ZoomOutButton from './ZoomOutButton'

function storeMapper(classifierStore) {
  const { zoomOut } = classifierStore.subjectViewer

  return {
    zoomOut
  }
}

function ZoomOutButtonContainer() {
  const { zoomOut } = useStores(storeMapper)
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

export default observer(ZoomOutButtonContainer)
