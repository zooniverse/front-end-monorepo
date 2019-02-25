import counterpart from 'counterpart'
import { Box, Heading } from 'grommet'
import { string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import en from './locales/en'

counterpart.registerTranslations('en', en)

const StyledHeading = styled(Heading)`
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
`

function ProjectHeader (props) {
  const { title } = props
  return (
    <Box pad='medium' background='teal'>
      <StyledHeading color='white' margin='none' size='small'>
        {title}
      </StyledHeading>
    </Box>
  )
}

ProjectHeader.propTypes = {
  title: string.isRequired
}

export default ProjectHeader
