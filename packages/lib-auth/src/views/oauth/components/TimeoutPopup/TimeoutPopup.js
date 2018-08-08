import counterpart from 'counterpart'
import React from 'react'

import en from './locales/en'
import LoginButton from '../shared/LoginButton'

counterpart.registerTranslations('en', en)

function TimeoutPopup () {
  return (
    <div>
      {counterpart('TimeoutPopup.message')}
      <LoginButton />
    </div>
  )
}

export default TimeoutPopup
