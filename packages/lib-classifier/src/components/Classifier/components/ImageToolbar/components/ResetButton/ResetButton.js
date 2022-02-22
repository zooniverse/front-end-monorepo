import PropTypes from 'prop-types'
import React from 'react'
import { useTranslation } from 'react-i18next'

import ResetIcon from './ResetIcon'
import Button from '../Button'

function ResetButton ({ disabled, onClick }) {
  const { t } = useTranslation('components')
  return (
    <Button
      a11yTitle={t('ImageToolbar.ResetButton.ariaLabel')}
      disabled={disabled}
      icon={<ResetIcon />}
      onClick={onClick}
    />
  )
}

ResetButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}

ResetButton.defaultProps = {
  disabled: false,
  onClick: () => console.log('Reset Button')
}

export default ResetButton
