import counterpart from 'counterpart'
import React from 'react'

import rotateIcon from './rotateIcon'
import en from './locales/en'
import Button from '../Button'

counterpart.registerTranslations('en', en)

function RotateButton () {
  return (
    <Button
      adjustments={{ y: '2' }}
      aria-label={counterpart('RotateButton.ariaLabel')}
    >
      {rotateIcon}
    </Button>
  )
}

export default RotateButton
