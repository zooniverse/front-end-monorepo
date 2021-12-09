import { PrimaryButton, withThemeContext } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { bool, func } from 'prop-types'
import React from 'react'

import nextButtonTheme from './theme'
import en from './locales/en'

counterpart.registerTranslations('en', en)

function NextButton ({
  autoFocus = false,
  disabled = false,
  hasNextStep = false,
  onClick = () => true
}) {
  const label = counterpart('NextButton.next')

  if (hasNextStep) {
    return (
      <PrimaryButton
        autoFocus={autoFocus}
        disabled={disabled}
        label={label}
        onClick={onClick}
        style={{ flex: '1 0'}}
      />
    )
  }

  return null
}

NextButton.propTypes = {
  autoFocus: bool,
  disabled: bool,
  hasNextStep: bool
}

export default withThemeContext(NextButton, nextButtonTheme)
export { NextButton }
