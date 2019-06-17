import counterpart from 'counterpart'
import { Box, ResponsiveContext } from 'grommet'
import { arrayOf, shape, string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import ApprovedIcon from './components/ApprovedIcon'
import Avatar from './components/Avatar'
import Background from './components/Background'
import DropdownNav from './components/DropdownNav'
import Nav from './components/Nav'
import ProjectTitle from './components/ProjectTitle'

import en from './locales/en'

counterpart.registerTranslations('en', en)

const StyledBox = styled(Box)`
  position: relative;
`

function ProjectHeader (props) {
  const { className, navLinks, projectHomeLink, size, title } = props

  return (
    <StyledBox as='header' className={className} aria-label={counterpart('ProjectHeader.ariaLabel')}>
      <Background />
      <Box
        align='center'
        direction={size === 'small' ? 'column' : 'row'}
        justify='between'
        pad='medium'
      >
        <Box
          align='center'
          direction={size === 'small' ? 'column' : 'row'}
          gap={size === 'small' ? 'xsmall' : 'medium'}
        >
          <Avatar isNarrow={size === 'small'} />
          <Box
            align='center'
            direction='row'
            gap={size === 'small' ? 'small' : 'medium'}
          >
            <ProjectTitle href={projectHomeLink} title={title} />
            <ApprovedIcon isNarrow={size === 'small'} />
          </Box>
        </Box>
        {size !== 'small' && <Nav navLinks={navLinks} />}
        {size === 'small' && <DropdownNav navLinks={navLinks} />}
      </Box>
    </StyledBox>
  )
}

ProjectHeader.propTypes = {
  className: string,
  href: string,
  navLinks: arrayOf(shape({
    href: string,
    text: string
  })),
  projectHomeLink: string,
  size: string,
  title: string.isRequired
}

function ProjectHeaderWithSize (props) {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <ProjectHeader size={size} {...props} />
      )}
    </ResponsiveContext.Consumer>
  )
}

export default ProjectHeaderWithSize

export { ProjectHeader }
