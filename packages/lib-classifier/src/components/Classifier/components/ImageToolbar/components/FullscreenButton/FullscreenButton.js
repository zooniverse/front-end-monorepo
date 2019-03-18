import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import React from 'react'

import actualSizeIcon from './actualSizeIcon'
import fullscreenIcon from './fullscreenIcon'
import en from './locales/en'
import Button from '../Button'

counterpart.registerTranslations('en', en)

function FullscreenButton ({ active, disabled, onClick }) {
  const icon = (active) ? actualSizeIcon : fullscreenIcon
  const labelKey = active ? 'actualSize' : 'fullscreen'
  const label = counterpart(`FullscreenButton.ariaLabel.${labelKey}`)

  return (
    <Button
      active={active}
      disabled={disabled}
      aria-label={label}
      onClick={disabled ? Function.prototype : onClick}
    >
      {icon}
    </Button>
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
