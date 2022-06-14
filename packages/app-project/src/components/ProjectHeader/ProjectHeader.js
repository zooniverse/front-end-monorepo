import { withResponsiveContext } from '@zooniverse/react-components'
import { Box } from 'grommet'
import { array, arrayOf, bool, shape, string } from 'prop-types'
import styled from 'styled-components'

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

function ProjectHeader ({
  availableLocales = [],
  className = '',
  inBeta = false,
  navLinks = [],
  screenSize = '',
  title
}) {

  const hasTranslations = environment === 'development' && availableLocales?.length > 1
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
            <Box>
              <ProjectTitle title={title} />
              {inBeta &&
                <UnderReviewLabel />}
            </Box>
            <ApprovedIcon isNarrow={screenSize === 'small'} />
            {hasTranslations && <LocaleSwitcher availableLocales={availableLocales} />}
          </Box>
        </Box>
        {screenSize !== 'small' && <Nav navLinks={navLinks} />}
        {screenSize === 'small' && <DropdownNav navLinks={navLinks} />}
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

export default withResponsiveContext(ProjectHeader)
export { ProjectHeader }
