import PropTypes from 'prop-types'
import React from 'react'
import { useTranslation } from '@translations/i18n'

import RotateIcon from './RotateIcon'
import Button from '../Button'

function RotateButton ({ disabled, onClick }) {
  const { t } = useTranslation('components')
  return (
    <Button
      a11yTitle={t('ImageToolbar.RotateButton.ariaLabel')}
      disabled={disabled}
      icon={<RotateIcon />}
      onClick={onClick}
    />
  )
}

RotateButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}

RotateButton.defaultProps = {
  disabled: false,
  onClick: () => console.log('Rotate Button')
}

export default RotateButton
