import { Box } from 'grommet'
import { CloseButton, Markdownz } from '@zooniverse/react-components'
import { bool, string, func } from 'prop-types'
import styled from 'styled-components'

import markdownzComponents from '../../helpers/markdownzComponents'

// Hides the close button from view / the accessibility tree, so the
// announcement text can be centred to the viewport
const Balancer = styled(CloseButton)`
  visibility: hidden;
`

// Spaces the paragraphs created by Markdown a little more nicely.
// Box.gap='large' doesn't seem to work.
const SpacedBox = styled(Box)`
  p {
    margin: 0.25em 0;
  }
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
          <SpacedBox direction='column'>
            <Markdownz components={markdownzComponents}>
              {announcement}
            </Markdownz>
          </SpacedBox>
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
