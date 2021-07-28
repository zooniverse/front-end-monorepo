import { withResponsiveContext } from '@zooniverse/react-components'
import { Box } from 'grommet'
import styled from 'styled-components'

const StyledBox = styled(Box)`
  border: 1px solid red;
`

function QuickTalk (props) {
  const { projectName, screenSize } = props

  // TODO: figure out if/how the QuickTalk component should/could be displayed on mobile
  if (screenSize === 'small') return null
  
  return (
    <StyledBox>
      Lorem Ipsum
    </StyledBox>
  )
}

QuickTalk.defaultProps = {}

QuickTalk.propTypes = {}

export default withResponsiveContext(QuickTalk)
export { QuickTalk }
