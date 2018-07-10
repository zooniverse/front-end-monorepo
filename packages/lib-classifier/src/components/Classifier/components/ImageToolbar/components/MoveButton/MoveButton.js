import counterpart from 'counterpart'
import React from 'react'

import moveIcon from './moveIcon'
import en from './locales/en'
import Button from '../Button'

counterpart.registerTranslations('en', en)

function MoveButton () {
  return (
    <Button
      aria-label={counterpart('MoveButton.ariaLabel')}
      size='46'
    >
      {moveIcon}
    </Button>
  )
}

export default MoveButton
