import { Button, Text, ThemeContext } from 'grommet'
import { bool, element, func, oneOf, oneOfType, string } from 'prop-types'
import { isValidElement } from 'react';

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
  const wrappedLabel = isValidElement(label)
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
        onClick={onClick}
        {...rest}
      />
    </ThemeContext.Extend>
  )
}

PrimaryButton.propTypes = {
  /** (string): The DOM tag or react component to use for the Grommet button element. */
  as: string,
  /** (string): Determines the theme. One of: blue, gold, green, teal. */
  color: oneOf(['blue', 'gold', 'green', 'teal']),
  /** (bool): Applied to button element */
  disabled: bool,
  /** (string): Attribute of the button's anchor element. */
  href: string,
  /** (element or string): Required. Becomes children of SpacedText. */
  label: oneOfType([element, string]).isRequired,
  /** (func): Called when button is clicked */
  onClick: func
}

export default PrimaryButton
