import React from 'react'
import counterpart from 'counterpart'

import pointerIcon from './pointerIcon'
import en from './locales/en'
import Button from '../Button'

counterpart.registerTranslations('en', en)

function AnnotateButton () {
  return (
    <Button
      adjustments={{ x: '1', y: '4' }}
      aria-label={counterpart('AnnotateButton.ariaLabel')}
    >
      {pointerIcon}
    </Button>
  )
}

export default AnnotateButton
