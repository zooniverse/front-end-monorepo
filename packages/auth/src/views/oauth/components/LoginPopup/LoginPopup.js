import counterpart from 'counterpart'
import React from 'react'

import en from './locales/en'
import LoginButton from '../shared/LoginButton'

counterpart.registerTranslations('en', en)

function LoginPopup () {
  return (
    <div>
      <div>
        {counterpart('LoginPopup.message')}
      </div>
      <LoginButton />
    </div>
  )
}

export default LoginPopup
