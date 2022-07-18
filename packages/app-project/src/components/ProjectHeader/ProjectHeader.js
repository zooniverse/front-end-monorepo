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

function ProjectHeader({
  availableLocales = [],
  className = '',
  inBeta = false,
  navLinks = [],
  title,
  width
}) {
  const hasTranslations = availableLocales?.length > 1
  // const hasTranslations = true
  const showDropdown = (hasTranslations && width < 1200) || (!hasTranslations && width < 768)

  return (
    <StyledBox as='header' className={className}>
      <Background />
      <StyledBox
        align='center'
        direction={showDropdown ? 'column' : 'row'}
        justify='between'
        pad='medium'
      >
        <Box direction={showDropdown ? 'column' : 'row'} gap='small'>
          <Box
            align='center'
            direction='row'
            gap={showDropdown ? 'small' : 'medium'}
          >
            <Box
              align='center'
              direction={width < 600 ? 'column' : 'row'}
              gap='medium'
            >
              <Avatar isNarrow={showDropdown} />
              <Box>
                <Box
                  direction='row'
                  gap='small'
                  align='center'
                >
                  <ProjectTitle hasTranslations={hasTranslations} title={title} />
                  <ApprovedIcon isNarrow={showDropdown} />
                </Box>
                {inBeta && <UnderReviewLabel />}
              </Box>
            </Box>
          </Box>
          {hasTranslations && (
            <LocaleSwitcher availableLocales={availableLocales} />
          )}
        </Box>
        {!showDropdown ? (
          <Nav navLinks={navLinks} />
        ) : (
          <DropdownNav navLinks={navLinks} />
        )}
      </StyledBox>
    </StyledBox>
  )
}

ProjectHeader.propTypes = {
  availableLocales: array,
  className: string,
  inBeta: bool,
  navLinks: arrayOf(
    shape({
      href: string,
      text: string
    })
  ),
  screenSize: string,
  title: string.isRequired
}

export default withResizeDetector(ProjectHeader)
export { ProjectHeader }
