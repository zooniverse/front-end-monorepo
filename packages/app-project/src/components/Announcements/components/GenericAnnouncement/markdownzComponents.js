import { Paragraph } from 'grommet'
import styled from 'styled-components'

const StyledParagraph = styled(Paragraph)`
  font-weight: bold;
`
function MarkdownParagraph(nodeProps) {
  return (
    <StyledParagraph color='black' margin='0'>
      {nodeProps.children}
    </StyledParagraph>
  )
}

const components = {
  p: MarkdownParagraph
}

export default components
