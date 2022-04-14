import PropTypes from 'prop-types'
import React from 'react'

import { withStores } from '@helpers'
import RotationSlider from './RotationSlider'

function storeMapper (classifierStore) {
  const {
    rotate,
    rotationEnabled
  } = classifierStore.subjectViewer

  const disabled = !rotationEnabled
  return {
    disabled,
    onClick: rotate
  }
}

function RotationSliderContainer({
  disabled = false,
  onClick = () => console.log('rotate view')
}) {
  if (disabled) {
    return null
  }
  return (
    <RotationSlider onClick={onClick} />
  )
}

RotationSliderContainer.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}

export default withStores(RotationSliderContainer, storeMapper)
