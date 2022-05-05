import { Button } from 'grommet'
import { bool, func, shape, string, oneOfType } from 'prop-types'
import styled, { withTheme } from 'styled-components'

import SpacedText from '../SpacedText'

export const StyledPlainButton = styled(Button)`
  &:focus,
  &:enabled:hover {
    text-decoration: underline;
  }

  &:disabled {
    cursor: not-allowed;
  }
`

function PlainButton (props) {
  const {
    as = '',
    className = '',
    disabled = false,
    href = '',
    onClick = () => {},
    labelSize = 'medium',
    text = '',
    color = {
      dark: 'accent-1',
      light: 'neutral-1'
    },
    ...rest
  } = props

  return (
    <StyledPlainButton
      as={as}
      className={className}
      disabled={disabled}
      href={disabled ? '' : href}
      gap='xxsmall'
      label={(
        <SpacedText
          color={color}
          size={labelSize}
        >
          {text}
        </SpacedText>
      )}
      onClick={onClick}
      plain
      {...rest}
    />
  )
}

PlainButton.propTypes = {
  /** (string) The DOM tag or react component to use for the Grommet button element. */
  as: string,
  className: string,
  /** ({ dark: string, light: string}): Defaults to { dark: 'accent-1', light: 'neutral-1' } */
  color: oneOfType([
    shape({
      dark: string,
      light: string
    }),
    string
  ]),
  /** (bool) Applied to button element */
  disabled: bool,
  /** (string) Attribute of the button's anchor element. */
  href: string,
  /** (string): Determines size of SpacedText child. Defaults to 'medium'. */
  labelSize: string,
  /** (func): Called when button is clicked */
  onClick: func,
  /** (string): Becomes children of SpacedText. */
  text: string,
  /** (bool): Determine's Grommet's light or dark theme */
  theme: shape({
    dark: bool
  })
}

export default withTheme(PlainButton)
export { PlainButton }
