import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import React from 'react'

import ActualSizeIcon from './ActualSizeIcon'
import FullscreenIcon from './FullscreenIcon'
import en from './locales/en'
import Button from '../Button'

counterpart.registerTranslations('en', en)

function FullscreenButton ({ active, disabled, onClick }) {
  const Icon = (active) ? ActualSizeIcon : FullscreenIcon
  const labelKey = active ? 'actualSize' : 'fullscreen'
  const label = counterpart(`FullscreenButton.ariaLabel.${labelKey}`)

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
