import { Paragraph } from 'grommet'
import styled from 'styled-components'

const StyledParagraph = styled(Paragraph)`
  font-weight: bold;
  line-height: 1.25;
  margin: 0 0 0 0;

  &:not(:first-child) {
    margin: 10px 0 0 0;
  }
`
function MarkdownParagraph(nodeProps) {
  return (
    <StyledParagraph color='black' margin='0' textAlign='center'>
      {nodeProps.children}
    </StyledParagraph>
  )
}

const components = {
  p: MarkdownParagraph
}

export default components
