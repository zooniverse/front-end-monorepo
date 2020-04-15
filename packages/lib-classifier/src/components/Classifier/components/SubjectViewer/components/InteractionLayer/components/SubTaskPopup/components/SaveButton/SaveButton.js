import { GoldButton, withThemeContext } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { bool, func } from 'prop-types'
import React from 'react'

import saveButtonTheme from './theme'
import en from './locales/en'

counterpart.registerTranslations('en', en)

function SaveButton (props) {
  const { autoFocus, disabled, onClick } = props
  const label = counterpart('SaveButton.save')
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

SaveButton.defaultProps = {
  autoFocus: false,
  disabled: false
}

SaveButton.propTypes = {
  autoFocus: bool,
  disabled: bool,
  onClick: func.isRequired
}

export default withThemeContext(SaveButton, saveButtonTheme)
export { SaveButton }
