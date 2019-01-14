import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import React from 'react'

import ActualSizeIcon from './ActualSizeIcon'
import FullscreenIcon from './FullscreenIcon'
import en from './locales/en'
import Button from '../Button'

counterpart.registerTranslations('en', en)

function FullscreenButton ({ active, onClick }) {
  const icon = (active) ? <ActualSizeIcon /> : <FullscreenIcon />
  const labelKey = active ? 'actualSize' : 'fullscreen'
  const label = counterpart(`FullscreenButton.ariaLabel.${labelKey}`)

  return (
    <Button
      active={active}
      aria-label={label}
      icon={icon}
      onClick={onClick}
    />
  )
}

FullscreenButton.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func
}

FullscreenButton.defaultProps = {
  active: false,
  onClick: () => console.log('toggle fullscreen')
}

export default FullscreenButton
