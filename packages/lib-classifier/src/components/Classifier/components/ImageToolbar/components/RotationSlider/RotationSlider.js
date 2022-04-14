import PropTypes from 'prop-types'
import React from 'react'
import { useTranslation } from 'react-i18next'

import RotateIcon from '../RotateButton/RotateIcon'
import Button from '../Button'

function RotationSlider ({ disabled, onClick }) {
  const { t } = useTranslation('components')
  return (
    <Button
      a11yTitle={t('ImageToolbar.RotationSlider.ariaLabel')}
      disabled={disabled}
      icon={<RotateIcon />}
      onClick={onClick}
    />
  )
}

RotationSlider.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}

RotationSlider.defaultProps = {
  disabled: false,
  onClick: () => console.log('Rotation Slider')
}

export default RotationSlider
