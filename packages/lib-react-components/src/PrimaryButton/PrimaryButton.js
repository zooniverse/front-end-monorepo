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
  const { as, color, disabled, href, label, ...rest } = props
  const theme = themeMap[color] || themeMap['gold']
  const wrappedLabel = React.isValidElement(label)
    ? label
    : <Text children={label} size='medium' />
  const renderAs = as || href && disabled && 'span'

  return (
    <ThemeContext.Extend value={theme}>
      <Button
        as={renderAs}
        disabled={disabled}
        href={href}
        label={wrappedLabel}
        primary
        {...rest}
      />
    </ThemeContext.Extend>
  )
}

PrimaryButton.propTypes = {
  color: PropTypes.oneOf(['blue', 'gold', 'green', 'teal']),
  label: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired
}

PrimaryButton.defaultProps = {
  color: 'gold',
  disabled: false,
  href: ''
}

export default PrimaryButton
