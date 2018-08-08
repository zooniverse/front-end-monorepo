import counterpart from 'counterpart'
import React from 'react'

import en from './locales/en'
import Countdown from '../shared/Countdown'
import LoginButton from '../shared/LoginButton'

counterpart.registerTranslations('en', en)

function TimeoutWarningPopup () {
  return (
    <div>
      <div>
        {counterpart('TimeoutWarningPopup.message')}
      </div>
      <Countdown />
      <LoginButton label={counterpart('TimeoutWarningPopup.button')} />
    </div>
  )
}

export default TimeoutWarningPopup
