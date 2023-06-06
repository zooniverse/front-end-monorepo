import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

import { useStores } from '@hooks'
import RotateButton from './RotateButton'

function storeMapper (classifierStore) {
  const { rotate, rotationEnabled, separateFramesView } =
    classifierStore.subjectViewer

  const show = rotationEnabled
  return {
    show,
    rotate,
    separateFramesView
  }
}

function RotateButtonContainer({ separateFrameRotate = () => true }) {
  const { show, rotate, separateFramesView } = useStores(storeMapper)

  if (!show) {
    return null
  }

  return (
    <RotateButton onClick={separateFramesView ? separateFrameRotate : rotate} />
  )
}

RotateButtonContainer.propTypes = {
  /** Used when separate frames of a subject each have their own ImageToolbar */
  separateFrameRotate: PropTypes.func
}

export default observer(RotateButtonContainer)
