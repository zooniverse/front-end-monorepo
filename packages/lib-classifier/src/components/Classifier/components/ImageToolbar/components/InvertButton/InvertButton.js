import PropTypes from 'prop-types'
import React from 'react'
import { useTranslation } from 'react-i18next'

import InvertIcon from './InvertIcon'
import Button from '../Button'

function InvertButton ({
  active = false,
  onClick = () => console.log('Invert Button')
}) {
  const { t } = useTranslation('components')
  return (
    <Button
      active={active}
      a11yTitle={t('ImageToolbar.InvertButton.ariaLabel')}
      icon={<InvertIcon />}
      onClick={onClick}
    />
  )
}

InvertButton.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func
}

export default InvertButton
