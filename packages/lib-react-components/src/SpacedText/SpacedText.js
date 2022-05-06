import { Text } from 'grommet'
import styled, { css } from 'styled-components'
import React from 'react'
import pxToRem from '../helpers/pxToRem'
import { bool, node, string } from 'prop-types'

const letterSpacing = pxToRem(1)
const StyledText = styled(Text)`
  letter-spacing: ${letterSpacing};
  ${props =>
    props.uppercase
      ? css`text-transform: uppercase;`
      : css`text-transform: normal;`}
`

export default function SpacedText(props) {
  const {
    children,
    margin = 'none',
    size = 'small',
    uppercase = true,
    weight = 'normal'
  } = props

  return (
    <StyledText
      margin={margin}
      size={size}
      uppercase={uppercase}
      weight={weight}
      {...props}
    >
      {children}
    </StyledText>
  )
}

SpacedText.propTypes = {
  /** (node) Required. The child of the component. Usually text. */
  children: node.isRequired,
  /** (string): Defaults to `none`. */
  margin: string,
  /** (string): Defaults to `small`. Maps to preset sizes defined in the grommet theme. */
  size: string,
  /** (boolean): Defaults to true. Handled by styled-components. */
  uppercase: bool,
  /** (string): Defaults to `normal`. Same as the `weight` prop for Grommet's `Text` component and used by the inner `SpacedText` component. */
  weight: string
}
