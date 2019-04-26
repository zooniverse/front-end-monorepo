import { withThemeContext } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Button, Text } from 'grommet'
import { bool, func } from 'prop-types'
import React from 'react'

import nextButtonTheme from './theme'
import en from './locales/en'

counterpart.registerTranslations('en', en)

const Label = (
  <Text size='medium'>
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

export default withThemeContext(NextButton, nextButtonTheme)
export { NextButton }
