import { Box } from 'grommet'
import { CloseButton, Markdownz } from '@zooniverse/react-components'
import { string, func } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import markdownzComponents from '../../helpers/markdownzComponents'

// Hides the close button from view / the accessibility tree, so the
// announcement text can be centred to the viewport
const Balancer = styled(CloseButton)`
  visibility: hidden;
`

function WideGenericAnnouncement(props) {
  const { announcement, closeFn, color } = props
  return (
    <Box align='center' background={color} fill='horizontal' pad='small'>
      <Box align='center' direction='row' gap='small' justify='between' width='xxlarge'>
        <Balancer />
        <Box align='center' fill='horizontal'>
          <Markdownz components={markdownzComponents}>
            {announcement}
          </Markdownz>
        </Box>
        <CloseButton closeFn={closeFn} />
      </Box>
    </Box>
  )
}

WideGenericAnnouncement.propTypes = {
  announcement: string.isRequired,
  closeFn: func.isRequired,
  color: string.isRequired
}

export default WideGenericAnnouncement
