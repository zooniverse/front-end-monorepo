import { Text } from 'grommet'
import styled from 'styled-components'
import React from 'react'

const StyledText = styled(Text)`
  letter-spacing: 0.15em;
  text-transform: uppercase;
`

function SpacedText ({ children, ...props }) {
  return (
    <StyledText {...props}>
      {children}
    </StyledText>
  )
}

SpacedText.defaultProps = {
  margin: 'none',
  size: 'small',
  weight: 'normal'
}

export default SpacedText
