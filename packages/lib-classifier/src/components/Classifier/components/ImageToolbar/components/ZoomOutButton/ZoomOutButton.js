import counterpart from 'counterpart'
import React from 'react'

import zoomOutIcon from './zoomOutIcon'
import en from './locales/en'
import Button from '../Button'

counterpart.registerTranslations('en', en)

function ZoomOutButton () {
  return (
    <Button aria-label={counterpart('ZoomOutButton.ariaLabel')}>
      {zoomOutIcon}
    </Button>
  )
}

export default ZoomOutButton
