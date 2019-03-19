import counterpart from 'counterpart'
import { Box, Heading } from 'grommet'
import { string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import Avatar from './components/Avatar'
import Background from './components/Background'
import Nav from './components/Nav'
import en from './locales/en'

counterpart.registerTranslations('en', en)

const StyledBox = styled(Box)`
  position: relative;
`

const StyledHeading = styled(Heading)`
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
`

function ProjectHeader (props) {
  const { className, title } = props
  return (
    <StyledBox>
      <Background />
      <Box
        align='center'
        className={className}
        direction='row'
        justify='between'
        pad='medium'
      >
        <Box align='center' direction='row' gap='medium'>
          <Avatar />
          <StyledHeading color='white' margin='none' size='small'>
            {title}
          </StyledHeading>
        </Box>
        <Nav />
      </Box>
    </StyledBox>

  )
}

ProjectHeader.propTypes = {
  title: string.isRequired
}

export default ProjectHeader
