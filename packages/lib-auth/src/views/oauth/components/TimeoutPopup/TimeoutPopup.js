import counterpart from 'counterpart'
import React from 'react'

import en from './locales/en'

counterpart.registerTranslations('en', en)

function TimeoutPopup () {
  return (
    <div>
      {counterpart('TimeoutPopup.message')}
    </div>
  )
}

export default TimeoutPopup
