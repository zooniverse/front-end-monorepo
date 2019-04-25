import counterpart from 'counterpart'
import { Button, Grommet, Text } from 'grommet'
import { FormNextLink } from 'grommet-icons'
import { merge } from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import { withTheme } from 'styled-components'

import nextButtonTheme from './theme'
import en from './locales/en'

counterpart.registerTranslations('en', en)

const Icon = (
  <FormNextLink
    color={{
      dark: 'neutral-4',
      light: 'black'
    }}
    size='medium'
  />
)

const Label = (
  <Text size='medium'>
    {counterpart('NextButton.next')}
  </Text>
)

function NextButton (props) {
  const { autoFocus, disabled, onClick, theme } = props
  const mergedThemes = merge({}, theme, nextButtonTheme)
  return (
    <Grommet theme={mergedThemes}>
      <Button
        autoFocus={autoFocus}
        disabled={disabled}
        fill
        icon={Icon}
        label={Label}
        onClick={onClick}
        primary
        reverse
        type='button'
      />
    </Grommet>
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

export default withTheme(NextButton)
export { NextButton }
