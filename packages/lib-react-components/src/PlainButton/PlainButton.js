import { Button } from 'grommet'
import { bool, func, shape, string, oneOfType } from 'prop-types'
import React from 'react'
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
    as,
    className,
    disabled,
    href,
    onClick,
    labelSize,
    text,
    color,
    ...rest
  } = props
  const renderAs = (href && disabled) ? 'span' : as

  return (
    <StyledPlainButton
      as={renderAs}
      className={className}
      disabled={disabled}
      href={href}
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

PlainButton.defaultProps = {
  as: '',
  className: '',
  color: {
    dark: 'accent-1',
    light: 'neutral-1'
  },
  href: '',
  labelSize: 'medium',
  onClick: () => {},
  text: '',
  theme: {
    dark: false
  }
}

PlainButton.propTypes = {
  as: string,
  className: string,
  color: oneOfType([
    shape({
      dark: string,
      light: string
    }),
    string
  ]),
  href: string,
  labelSize: string,
  onClick: func,
  text: string,
  theme: shape({
    dark: bool
  })
}

export default withTheme(PlainButton)
export { PlainButton }
