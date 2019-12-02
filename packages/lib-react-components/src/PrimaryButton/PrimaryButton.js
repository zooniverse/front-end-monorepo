import { Button, Text, ThemeContext } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'

import blueTheme from './themes/blue'
import goldTheme from './themes/gold'
import greenTheme from './themes/green'
import tealTheme from './themes/teal'

const themeMap = {
  blue: blueTheme,
  gold: goldTheme,
  green: greenTheme,
  teal: tealTheme,
}

function PrimaryButton (props) {
  const { color, label, ...rest } = props
  const theme = themeMap[color]
  const wrappedLabel = React.isValidElement(label)
    ? label
    : <Text children={label} size='medium' />

  return (
    <ThemeContext.Extend value={theme}>
      <Button
        label={wrappedLabel}
        primary
        {...rest}
      />
    </ThemeContext.Extend>
  )
}

PrimaryButton.propTypes = {
  color: PropTypes.oneOf(['blue', 'gold', 'green', 'teal']),
  label: PropTypes.oneOf(PropTypes.element, PropTypes.string).isRequired
}

PrimaryButton.defaultProps = {
  color: 'gold'
}

export default PrimaryButton
