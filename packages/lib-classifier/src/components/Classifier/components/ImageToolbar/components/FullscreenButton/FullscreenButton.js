import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import React from 'react'

import actualSizeIcon from './actualSizeIcon'
import fullscreenIcon from './fullscreenIcon'
import en from './locales/en'
import Button from '../Button'

counterpart.registerTranslations('en', en)

function FullscreenButton ({ active, onClick }) {
  const icon = (active) ? actualSizeIcon : fullscreenIcon
  const labelKey = active ? 'actualSize' : 'fullscreen'
  const label = counterpart(`FullscreenButton.ariaLabel.${labelKey}`)

  return (
    <Button
      active={active}
      aria-label={label}
      onClick={onClick}
    >
      {icon}
    </Button>
  )
}

FullscreenButton.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func
}

FullscreenButton.defaultProps = {
  active: false,
  onClick: () => console.log(counterpart(`FullscreenButton.ariaLabel.${labelKey}`))
}

export default FullscreenButton
