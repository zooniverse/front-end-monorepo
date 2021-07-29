import { withResponsiveContext } from '@zooniverse/react-components'
import { Box } from 'grommet'
import styled from 'styled-components'
import { string } from 'prop-types'

const StyledBox = styled(Box)`
  border: 1px solid red;
`

function getTalkURL (projectSlug, subjectId) {
  const origin = window?.location?.origin
  
  if (!origin || !projectSlug || !subjectId) return ''
  
  return `${origin}/projects/${projectSlug}/talk/subjects/${subjectId}`
}

function QuickTalk (props) {
  const { projectSlug, subjectID, screenSize  } = props

  // TODO: figure out if/how the QuickTalk component should/could be displayed on mobile
  if (screenSize === 'small') return null
  
  return (
    <StyledBox>
      {projectSlug} ... {subjectID}
    </StyledBox>
  )
}

QuickTalk.propTypes = {
  projectSlug: string,
  subjectID: string,
}

export default withResponsiveContext(QuickTalk)
export { QuickTalk }
