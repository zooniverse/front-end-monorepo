import { Paragraph } from 'grommet'
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
  p: MarkdownParagraph
}

export default components
