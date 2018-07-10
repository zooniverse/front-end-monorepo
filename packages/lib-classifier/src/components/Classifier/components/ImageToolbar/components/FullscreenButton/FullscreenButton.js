import counterpart from 'counterpart'
import React from 'react'

import actualSizeIcon from './actualSizeIcon'
import fullscreenIcon from './fullscreenIcon'
import en from './locales/en'
import Button from '../Button'

counterpart.registerTranslations('en', en)

function FullscreenButton () {
  const icon = fullscreenIcon
  return (
    <Button aria-label={counterpart('FullscreenButton.ariaLabel')}>
      {icon}
    </Button>
  )
}

export default FullscreenButton
