import counterpart from 'counterpart'
import { Anchor, Box, Heading } from 'grommet'
import { string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import Avatar from './components/Avatar'
import Background from './components/Background'
import Nav from './components/Nav'
import ApprovedIcon from './components/ApprovedIcon'
import en from './locales/en'

counterpart.registerTranslations('en', en)

const StyledBox = styled(Box)`
  position: relative;
`

const StyledHeading = styled(Heading)`
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
`

const StyledAnchor = styled(Anchor)`
  border-bottom: 3px solid transparent;
  &:focus,
  &:hover {
    text-decoration: none;
    border-color: white;
  }
`

function ProjectHeader (props) {
  const { className, href, title } = props

  const Title = () => (
    <StyledHeading color='white' margin='none' size='small'>
      {title}
    </StyledHeading>
  )

  return (
    <StyledBox className={className}>
      <Background />
      <Box
        align='center'
        direction='row'
        justify='between'
        pad='medium'
      >
        <Box align='center' direction='row' gap='medium'>
          <Avatar />
          {href
            ? <StyledAnchor href={href}><Title /></StyledAnchor>
            : <Title />
          }
          <ApprovedIcon />
        </Box>
        <Nav />
      </Box>
    </StyledBox>

  )
}

ProjectHeader.propTypes = {
  className: string,
  href: string,
  title: string.isRequired
}

export default ProjectHeader
