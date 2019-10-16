import { GoldButton, withThemeContext } from '@zooniverse/react-components'
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
    <GoldButton
      autoFocus={autoFocus}
      disabled={disabled}
      fill
      label={label}
      onClick={onClick}
      primary
      reverse
      type='button'
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
