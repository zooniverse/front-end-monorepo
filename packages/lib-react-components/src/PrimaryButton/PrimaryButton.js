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
  teal: tealTheme
}

function PrimaryButton ({
  as = '',
  color = 'gold',
  disabled = false,
  href = '',
  label,
  onClick = () => {},
  ...rest
}) {
  const theme = themeMap[color] || themeMap['gold']
  const wrappedLabel = React.isValidElement(label)
    ? label
    : <Text size='medium'>{label}</Text>

  return (
    <ThemeContext.Extend value={theme}>
      <Button
        as={as}
        disabled={disabled}
        href={disabled ? '' : href}
        label={wrappedLabel}
        primary
        {...rest}
      />
    </ThemeContext.Extend>
  )
}

PrimaryButton.propTypes = {
  /** (string): The DOM tag or react component to use for the Grommet button element. */
  as: PropTypes.string,
  /** (string): Determines the theme. One of: blue, gold, green, teal. */
  color: PropTypes.oneOf(['blue', 'gold', 'green', 'teal']),
  /** (bool): Applied to button element */
  disabled: PropTypes.bool,
  /** (string): Attribute of the button's anchor element. */
  href: PropTypes.string,
  /** (element or string): Required. Becomes children of SpacedText. */
  label: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  /** (func): Called when button is clicked */
  onClick: PropTypes.func
}

export default PrimaryButton
