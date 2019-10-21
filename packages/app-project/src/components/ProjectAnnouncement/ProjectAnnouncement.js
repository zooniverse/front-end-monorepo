import { Box, Paragraph } from 'grommet'
import { CloseButton, Markdownz } from '@zooniverse/react-components'
import { string, func } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { Media } from '@shared/components/Media'

const StyledParagraph = styled(Paragraph)`
  font-weight: bold;
  max-width: 60em;
`

// Hides the close button from view / the accessibility tree, so the
// announcement text can be centred to the viewport
const Balancer = styled(CloseButton)`
  visibility: hidden;
`

const components = {
  p: (nodeProps) => (
    <StyledParagraph color='black' margin='none'>
      {nodeProps.children}
    </StyledParagraph>
  )
}

function ProjectAnnouncement (props) {
  const { announcement, closeFn } = props

  return (
    <>
      <Media at='default'>
        <Box align='center' background='neutral-4' fill='horizontal' pad='small'>
          <Box align='center' direction='row' gap='small' justify='between'>
            <Markdownz components={components}>
              {announcement}
            </Markdownz>
            <CloseButton closeFn={closeFn} />
          </Box>
        </Box>
      </Media>

      <Media greaterThan='default'>
        <Box align='center' background='neutral-4' fill='horizontal' pad='small'>
          <Box align='center' direction='row' gap='small' justify='between' width='xxlarge'>
            <Balancer />
            <Box align='center' fill='horizontal'>
              <Markdownz components={components}>
                {announcement}
              </Markdownz>
            </Box>
            <CloseButton closeFn={closeFn} />
          </Box>
        </Box>
      </Media>
    </>
  )
}




ProjectAnnouncement.propTypes = {
  announcement: string.isRequired,
  closeFn: func.isRequired
}

export default ProjectAnnouncement
