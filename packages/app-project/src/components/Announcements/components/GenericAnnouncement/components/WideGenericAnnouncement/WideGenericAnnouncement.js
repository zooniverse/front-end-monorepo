import { Box } from 'grommet'
import { CloseButton, Markdownz } from '@zooniverse/react-components'
import { bool, string, func } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import markdownzComponents from '../../helpers/markdownzComponents'

// Hides the close button from view / the accessibility tree, so the
// announcement text can be centred to the viewport
const Balancer = styled(CloseButton)`
  visibility: hidden;
`

function WideGenericAnnouncement(props) {
  const {
    announcement,
    children,
    closeFn,
    color,
    dismissable
  } = props

  return (
    <Box align='center' background={color} fill='horizontal' pad={{ horizontal: 'small', vertical: 'xsmall' }}>
      <Box align='center' direction='row' gap='small' justify='between' width='xxlarge'>
        {dismissable &&
          <Balancer />}
        <Box align='center' direction='row' gap='small' fill='horizontal' justify='center'>
          <Markdownz components={markdownzComponents}>
            {announcement}
          </Markdownz>
          {children}
        </Box>
        {dismissable &&
          <CloseButton closeFn={closeFn} />}
      </Box>
    </Box>
  )
}

WideGenericAnnouncement.defaultProps = {
  dismissable: false,
  closeFn: () => {}
}

WideGenericAnnouncement.propTypes = {
  announcement: string.isRequired,
  closeFn: func,
  color: string.isRequired,
  dismissable: bool
}

export default WideGenericAnnouncement
