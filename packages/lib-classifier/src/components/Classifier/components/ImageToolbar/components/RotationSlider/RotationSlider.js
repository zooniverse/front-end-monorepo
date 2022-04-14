import PropTypes from 'prop-types'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { RangeInput } from 'grommet'

function RotationSlider ({ disabled, onChange, rotation }) {
  const { t } = useTranslation('components')
  return (
    <RangeInput
      a11yTitle={t('ImageToolbar.RotationSlider.ariaLabel')}
      disabled={disabled}
      min={0}
      max={359}
      value={rotation}
      onChange={onChange}
    />
  )
}

RotationSlider.propTypes = {
  disabled: PropTypes.bool,
  onChange: PropTypes.func
}

RotationSlider.defaultProps = {
  disabled: false,
  onChange: () => console.log('Rotation Slider')
}

export default RotationSlider
