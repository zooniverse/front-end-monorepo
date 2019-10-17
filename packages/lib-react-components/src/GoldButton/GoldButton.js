import { Button, Text } from 'grommet'
import { bool, func } from 'prop-types'
import React from 'react'
import withThemeContext from '../helpers/withThemeContext'
import goldButtonTheme from './theme'

function GoldButton(props) {
  const { label, ...rest } = props
  return (
    <Button
      label={<Text size='medium'>{label}</Text>}
      primary
      {...rest}
    />
  )
}

GoldButton.defaultProps = {
  autoFocus: false,
  disabled: false
}

GoldButton.propTypes = {
  autoFocus: bool,
  disabled: bool,
  onClick: func.isRequired
}

export default withThemeContext(GoldButton, goldButtonTheme)
export { GoldButton }
