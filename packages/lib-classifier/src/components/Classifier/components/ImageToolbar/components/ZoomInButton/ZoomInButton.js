import counterpart from 'counterpart'
import React from 'react'

import zoomInIcon from './zoomInIcon'
import en from './locales/en'
import Button from '../Button'

counterpart.registerTranslations('en', en)

function ZoomInButton () {
  return (
    <Button aria-label={counterpart('ZoomInButton.ariaLabel')}>
      {zoomInIcon}
    </Button>
  )
}

export default ZoomInButton
