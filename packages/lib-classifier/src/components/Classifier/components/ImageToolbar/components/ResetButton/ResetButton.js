import counterpart from 'counterpart'
import React from 'react'

import resetIcon from './resetIcon'
import en from './locales/en'
import Button from '../Button'

counterpart.registerTranslations('en', en)

function ResetButton () {
  return (
    <Button aria-label={counterpart('ResetButton.ariaLabel')}>
      {resetIcon}
    </Button>
  )
}

export default ResetButton
