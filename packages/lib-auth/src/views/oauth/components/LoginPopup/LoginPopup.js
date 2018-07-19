import counterpart from 'counterpart'
import React from 'react'

import en from './locales/en'
import WithPopup from '../shared/WithPopup'

counterpart.registerTranslations('en', en)

function LoginPopup () {
  return (
    <div>
      {counterpart('LoginPopup.message')}
    </div>
  )
}

export default WithPopup(LoginPopup)

export { LoginPopup }
