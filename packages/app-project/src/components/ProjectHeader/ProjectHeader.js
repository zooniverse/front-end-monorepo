import { withResponsiveContext } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Box } from 'grommet'
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
  const { className, navLinks, projectHomeLink, screenSize } = props

  const isNarrow = screenSize === 'small'

  return (
    <StyledBox as='header' className={className}>
      <Background />
      <Box
        align='center'
        direction={isNarrow ? 'column' : 'row'}
        justify='between'
        pad='medium'
      >
        <Box
          align='center'
          direction={isNarrow ? 'column' : 'row'}
          gap={isNarrow ? 'xsmall' : 'medium'}
        >
          <Avatar isNarrow={isNarrow} />
          <Box
            align='center'
            direction='row'
            gap={isNarrow ? 'small' : 'medium'}
          >
            <ProjectTitle href={projectHomeLink} />
            <ApprovedIcon isNarrow={isNarrow} />
          </Box>
        </Box>

        {isNarrow ? <DropdownNav navLinks={navLinks} /> : <Nav navLinks={navLinks} />}
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
  size: string
}

export default withResponsiveContext(ProjectHeader)

export { ProjectHeader }
