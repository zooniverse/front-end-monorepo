import { Box } from 'grommet'
import { array, arrayOf, bool, shape, string } from 'prop-types'
import styled from 'styled-components'
import { withResizeDetector } from 'react-resize-detector'

import ApprovedIcon from './components/ApprovedIcon'
import Avatar from './components/Avatar'
import Background from './components/Background'
import DropdownNav from './components/DropdownNav'
import LocaleSwitcher from './components/LocaleSwitcher'
import Nav from './components/Nav'
import ProjectTitle from './components/ProjectTitle'
import UnderReviewLabel from './components/UnderReviewLabel'

const StyledBox = styled(Box)`
  position: relative;
`

function ProjectHeader ({
  availableLocales = [],
  className = '',
  inBeta = false,
  navLinks = [],
  title,
  width
}) {
  const hasTranslations = availableLocales?.length > 1
  const showDropdown = (hasTranslations && width < 1000) || (!hasTranslations && width < 800)

  return (
    <StyledBox as='header' className={className}>
      <Background />
      <StyledBox
        align='center'
        direction={showDropdown ? 'column' : 'row'}
        justify='between'
        pad='medium'
      >
        <Box
          align='center'
          direction={showDropdown ? 'column' : 'row'}
          gap={showDropdown ? 'xsmall' : 'medium'}
        >
          <Avatar isNarrow={showDropdown} />
          <Box
            align='center'
            direction='row'
            gap={showDropdown ? 'small' : 'medium'}
          >
            <Box>
              <ProjectTitle title={title} />
              {inBeta &&
                <UnderReviewLabel />}
            </Box>
            <ApprovedIcon isNarrow={showDropdown} />
            {hasTranslations && <LocaleSwitcher availableLocales={availableLocales} />}
          </Box>
        </Box>
        {!showDropdown
          ? <Nav navLinks={navLinks} />
          : <DropdownNav navLinks={navLinks} />}
      </StyledBox>
    </StyledBox>
  )
}

ProjectHeader.propTypes = {
  availableLocales: array,
  className: string,
  inBeta: bool,
  navLinks: arrayOf(shape({
    href: string,
    text: string
  })),
  screenSize: string,
  title: string.isRequired
}

export default withResizeDetector(ProjectHeader)
export { ProjectHeader }
