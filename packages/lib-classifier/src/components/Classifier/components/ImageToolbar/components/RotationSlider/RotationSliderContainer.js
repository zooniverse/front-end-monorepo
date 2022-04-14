import PropTypes from 'prop-types'
import React from 'react'

import { withStores } from '@helpers'
import RotationSlider from './RotationSlider'

function storeMapper (classifierStore) {
  const {
    rotateFreely,
    rotation,
    rotationEnabled
  } = classifierStore.subjectViewer

  const disabled = !rotationEnabled
  const onChange = function handleRotation (e) {
    rotateFreely(e?.target?.value || 0)
  }

  return {
    disabled,
    onChange,
    rotation
  }
}

function RotationSliderContainer({
  disabled = false,
  onChange = () => console.log('rotate view'),
  rotation = 0
}) {
  if (disabled) {
    return null
  }
  return (
    <RotationSlider onChange={onChange} rotation={rotation} />
  )
}

RotationSliderContainer.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}

export default withStores(RotationSliderContainer, storeMapper)
