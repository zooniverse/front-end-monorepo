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

const environment = process.env.APP_ENV

function ProjectHeader({
  availableLocales = [],
  className = '',
  inBeta = false,
  navLinks = [],
  title,
  width
}) {
  const hasTranslations = environment === 'development' && availableLocales?.length > 1
  const showDropdownWithRow = (hasTranslations && width < 1200) || (!hasTranslations && width < 1100)
  const showDropdownWithColumn = (hasTranslations && width < 1000) || (!hasTranslations && width < 900)

  const calcMaxWidth = () => {
    if (hasTranslations && width >= 1200) {
      return '560px'
    } else {
      return '600px'
    }
  }

  return (
    <StyledBox as='header' className={className}>
      <Background />
      <StyledBox
        align='center'
        direction={showDropdownWithColumn ? 'column' : 'row'}
        justify='between'
        pad='medium'
      >
        <Box direction={showDropdownWithColumn ? 'column' : 'row'} gap='small'>
          <Box
            align='center'
            direction='row'
            gap={showDropdownWithColumn ? 'small' : 'medium'}
          >
            <Box
              align='center'
              direction={showDropdownWithColumn ? 'column' : 'row'}
              gap='medium'
            >
              <Avatar isNarrow={showDropdownWithColumn} />
              <Box>
                <Box
                  direction='row'
                  gap='small'
                  align='center'
                  style={{ maxWidth: calcMaxWidth() }}
                >
                  <ProjectTitle showDropdown={showDropdownWithColumn} title={title} />
                  <ApprovedIcon isNarrow={showDropdownWithColumn} />
                </Box>
                {inBeta && <UnderReviewLabel />}
              </Box>
            </Box>
          </Box>
          {hasTranslations && (
            <LocaleSwitcher availableLocales={availableLocales} />
          )}
        </Box>
        {showDropdownWithRow || showDropdownWithColumn ? (
          <DropdownNav navLinks={navLinks} showDropdownWithColumn={showDropdownWithColumn} />
        ) : (
          <Nav navLinks={navLinks} />
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
  title: string.isRequired
}

export default withResizeDetector(ProjectHeader)
export { ProjectHeader }
