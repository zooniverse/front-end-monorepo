import PropTypes from 'prop-types'
import React from 'react'
import { useTranslation } from '@translations/i18n'

import ActualSizeIcon from './ActualSizeIcon'
import FullscreenIcon from './FullscreenIcon'
import Button from '../Button'

function FullscreenButton ({ active, disabled, onClick }) {
  const { t } = useTranslation('components')
  const Icon = (active) ? ActualSizeIcon : FullscreenIcon
  const labelKey = active ? 'actualSize' : 'fullscreen'
  const label = t(`ImageToolbar.FullscreenButton.ariaLabel.${labelKey}`)

  return (
    <Button
      a11yTitle={label}
      active={active}
      disabled={disabled}
      icon={<Icon />}
      onClick={onClick}
    />
  )
}

FullscreenButton.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}

FullscreenButton.defaultProps = {
  active: false,
  disabled: false,
  onClick: () => console.log('toggle fullscreen')
}

export default FullscreenButton
