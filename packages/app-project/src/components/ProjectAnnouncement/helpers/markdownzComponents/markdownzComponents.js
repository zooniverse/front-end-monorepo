import { Paragraph } from 'grommet'
import React from 'react'
import styled from 'styled-components'

const StyledParagraph = styled(Paragraph)`
  font-weight: bold;
  max-width: 60em;
`

const components = {
  p: (nodeProps) => (
    <StyledParagraph color='black' margin='none'>
      {nodeProps.children}
    </StyledParagraph>
  )
}

export default components
