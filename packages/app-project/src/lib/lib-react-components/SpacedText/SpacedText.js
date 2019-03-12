import { Text } from 'grommet'
import styled from 'styled-components'
import React from 'react'
import pxToRem from '../helpers/pxToRem'

const StyledText = styled(Text)`
  letter-spacing: ${pxToRem(1)};
  text-transform: ${props => props.uppercase ? 'uppercase' : 'normal'};
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
