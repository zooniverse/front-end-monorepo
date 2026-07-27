import { Button, Text, ThemeContext } from 'grommet'
import { bool, element, func, oneOf, oneOfType, string } from 'prop-types'
import { isValidElement } from 'react'

import darkTealTheme from './darkTeal'

function DarkTealPrimaryButton ({
  as = '',
  disabled = false,
  href = null,
  label,
  onClick = () => {},
  ...rest
}) {
  const theme = darkTealTheme
  const wrappedLabel = isValidElement(label)
    ? label
    : <Text size='medium'>{label}</Text>

  return (
    <ThemeContext.Extend value={theme}>
      <Button
        as={as}
        disabled={disabled}
        href={disabled ? null : href}
        label={wrappedLabel}
        primary
        onClick={onClick}
        {...rest}
      />
    </ThemeContext.Extend>
  )
}

DarkTealPrimaryButton.propTypes = {
  /** (string): The DOM tag or react component to use for the Grommet button element. */
  as: string,
  /** (bool): Applied to button element */
  disabled: bool,
  /** (string): Attribute of the button's anchor element. */
  href: string,
  /** (element or string): Required. */
  label: oneOfType([element, string]).isRequired,
  /** (func): Called when button is clicked */
  onClick: func
}

export default DarkTealPrimaryButton
