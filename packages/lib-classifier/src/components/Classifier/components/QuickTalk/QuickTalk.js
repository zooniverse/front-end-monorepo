import React from 'react'
import { withResponsiveContext } from '@zooniverse/react-components'
import { Box } from 'grommet'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const StyledBox = styled(Box)`
  border: 1px solid red;
`

function QuickTalk ({ subject, screenSize }) {
  
  console.log('+++ ', subject)

  // TODO: figure out if/how the QuickTalk component should/could be displayed on mobile
  if (!subject || screenSize === 'small') return null
  
  return (
    <StyledBox>
      {subject.talkURL}
    </StyledBox>
  )
}

QuickTalk.propTypes = {
  subject: PropTypes.object,
}

export default withResponsiveContext(QuickTalk)
export { QuickTalk }
