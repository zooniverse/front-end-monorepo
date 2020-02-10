import { Text } from 'grommet'
import styled, { css } from 'styled-components'
import React from 'react'
import pxToRem from '../helpers/pxToRem'

const letterSpacing = pxToRem(1)
const StyledText = styled(Text)`
  letter-spacing: ${letterSpacing};
  ${props => props.uppercase ? 
    css`text-transform: uppercase;` :
    css`text-transform: normal;`
  }
`

export default function SpacedText ({ children, ...props }) {
  return (
    <StyledText {...props}>
      {children}
    </StyledText>
  )
}

SpacedText.defaultProps = {
  margin: 'none',
  size: 'small',
  uppercase: true,
  weight: 'normal'
}
