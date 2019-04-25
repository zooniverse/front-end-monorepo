import counterpart from 'counterpart'
import { Button, Text, ThemeContext } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'

import nextButtonTheme from './theme'
import en from './locales/en'

counterpart.registerTranslations('en', en)

const Label = (
  <Text size='medium'>
    {counterpart('NextButton.next')} →
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
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired
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
