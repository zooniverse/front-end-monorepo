import { PrimaryButton } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import React from 'react'

import en from './locales/en'

counterpart.registerTranslations('en', en)

function DoneAndTalkButton ({
  disabled = false,
  onClick = () => {}
}) {
  return (
    <PrimaryButton
      color='blue'
      disabled={disabled}
      label={counterpart('DoneAndTalkButton.doneAndTalk')}
      onClick={onClick}
      style={{ flex: '1 0', marginRight: '1ch' , textTransform: 'capitalize' }}
    />
  )
}

DoneAndTalkButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}

export default DoneAndTalkButton
