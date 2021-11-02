import { withResponsiveContext } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Box } from 'grommet'
import { array, arrayOf, bool, shape, string } from 'prop-types'
import styled from 'styled-components'

import ApprovedIcon from './components/ApprovedIcon'
import Avatar from './components/Avatar'
import Background from './components/Background'
import DropdownNav from './components/DropdownNav'
import LocaleToggle from './components/LocaleToggle'
import Nav from './components/Nav'
import ProjectTitle from './components/ProjectTitle'
import UnderReviewLabel from './components/UnderReviewLabel'

import en from './locales/en'

counterpart.registerTranslations('en', en)

const StyledBox = styled(Box)`
  position: relative;
`

function ProjectHeader (props) {
  const { availableLocales, className, inBeta, navLinks, screenSize, title } = props
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
            {availableLocales?.length > 1 && <LocaleToggle availableLocales={availableLocales} />}
          </Box>
        </Box>
        {screenSize !== 'small' && <Nav navLinks={navLinks} />}
        {screenSize === 'small' && <DropdownNav navLinks={navLinks} />}
      </StyledBox>
    </StyledBox>
  )
}

ProjectHeader.defaultProps = {
  availableLocales: [],
  className: '',
  inBeta: false,
  href: '',
  screenSize: ''
}

ProjectHeader.propTypes = {
  availableLocales: array,
  className: string,
  inBeta: bool,
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
