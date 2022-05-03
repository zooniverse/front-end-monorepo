import PropTypes from 'prop-types'
import React from 'react'
import { useTranslation } from 'react-i18next'

import InvertIcon from './InvertIcon'
import Button from '../Button'

function InvertButton ({ disabled, onClick }) {
  const { t } = useTranslation('components')
  return (
    <Button
      a11yTitle={t('ImageToolbar.InvertButton.ariaLabel')}
      disabled={disabled}
      icon={<InvertIcon />}
      onClick={onClick}
    />
  )
}

InvertButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}

InvertButton.defaultProps = {
  disabled: false,
  onClick: () => console.log('Invert Button')
}

export default InvertButton
