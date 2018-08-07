import counterpart from 'counterpart'
import React from 'react'

import en from './locales/en'
import WithPopup from '../shared/WithPopup'

counterpart.registerTranslations('en', en)

function LogoutPopup () {
  return (
    <div>
      {counterpart('LogoutPopup.message')}
    </div>
  )
}

export default LogoutPopup
