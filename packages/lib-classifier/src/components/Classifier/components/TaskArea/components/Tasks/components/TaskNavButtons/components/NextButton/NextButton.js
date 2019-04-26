import counterpart from 'counterpart'
import { Button, Text, ThemeContext } from 'grommet'
import { bool, func } from 'prop-types'
import React from 'react'

import nextButtonTheme from './theme'
import en from './locales/en'

counterpart.registerTranslations('en', en)

// TODO: This will need hooking up to counterpart / a helper function to
// determine whether to use an RTL language or not
const Label = (
  <Text size='medium' isRtl={false}>
    {counterpart('NextButton.next')}
  </Text>
)

function NextButton (props) {
  const { autoFocus, disabled, onClick } = props
  return (
    <Button
      a11yTitle={counterpart('NextButton.next')}
      autoFocus={autoFocus}
      disabled={disabled}
      fill
      label={Label}
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

function wrappedNextButton (props) {
  return (
    <ThemeContext.Extend value={nextButtonTheme}>
      <NextButton {...props} />
    </ThemeContext.Extend>
  )
}

export default wrappedNextButton
export { NextButton }
