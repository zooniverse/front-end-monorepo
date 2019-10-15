import { Box, Paragraph } from 'grommet'
import { Markdownz } from '@zooniverse/react-components'
import { string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const StyledParagraph = styled(Paragraph)`
  font-weight: bold;
  max-width: 60em;
`

const components = {
  p: (nodeProps) => (
    <StyledParagraph color='black' margin='none'>
      {nodeProps.children}
    </StyledParagraph>
  )
}

function ProjectAnnouncement (props) {
  const { announcement } = props
  return (
    <Box align='center' background='neutral-4' fill='horizontal' pad='small'>
      <Markdownz components={components}>
        {announcement}
      </Markdownz>
    </Box>
  )
}

ProjectAnnouncement.propTypes = {
  announcement: string.isRequired
}

export default ProjectAnnouncement
