import { Paragraph } from 'grommet'
import Link from 'next/link'
import styled from 'styled-components'

const StyledParagraph = styled(Paragraph)`
  font-weight: bold;
  max-width: 60em;
`
function MarkdownParagraph(nodeProps) {
  return (
    <StyledParagraph color='black' margin='none'>
      {nodeProps.children}
    </StyledParagraph>
  )
}

const components = {
  a: Link,
  p: MarkdownParagraph
}

export default components
