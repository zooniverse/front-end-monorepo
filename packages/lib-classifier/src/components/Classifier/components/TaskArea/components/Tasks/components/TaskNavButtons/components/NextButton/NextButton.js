import { PrimaryButton, withThemeContext } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { bool, func } from 'prop-types'
import React from 'react'

import nextButtonTheme from './theme'
import en from './locales/en'

counterpart.registerTranslations('en', en)

function NextButton (props) {
  const { autoFocus, disabled, onClick } = props
  const label = counterpart('NextButton.next')
  return (
    <PrimaryButton
      autoFocus={autoFocus}
      disabled={disabled}
      label={label}
      onClick={onClick}
    />
  )
}

NextButton.defaultProps = {
  autoFocus: false,
  disabled: false
}

NextButton.propTypes = {
  autoFocus: bool,
  disabled: bool,
  onClick: func.isRequired
}

export default withThemeContext(NextButton, nextButtonTheme)
export { NextButton }
