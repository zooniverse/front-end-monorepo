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
  const { className, navLinks, screenSize, title } = props
  return (
    <StyledBox as='header' className={className}>
      <Background />
      <StyledBox
        align='center'
        direction={screenSize === 'small' ? 'column' : 'row'}
        justify='between'
        pad='medium'
      >
        <Box
          align='center'
          direction={screenSize === 'small' ? 'column' : 'row'}
          gap={screenSize === 'small' ? 'xsmall' : 'medium'}
        >
          <Avatar isNarrow={screenSize === 'small'} />
          <Box
            align='center'
            direction='row'
            gap={screenSize === 'small' ? 'small' : 'medium'}
          >
            <ProjectTitle title={title} />
            <ApprovedIcon isNarrow={screenSize === 'small'} />
          </Box>
        </Box>
        {screenSize !== 'small' && <Nav navLinks={navLinks} />}
        {screenSize === 'small' && <DropdownNav navLinks={navLinks} />}
      </StyledBox>
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
  screenSize: string,
  title: string.isRequired
}

export default withResponsiveContext(ProjectHeader)
export { ProjectHeader }
