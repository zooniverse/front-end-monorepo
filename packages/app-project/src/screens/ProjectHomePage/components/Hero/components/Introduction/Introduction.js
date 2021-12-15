import { SpacedText } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Anchor, Box, Paragraph } from 'grommet'
import { Next } from 'grommet-icons'
import NavLink from '@shared/components/NavLink'
import { object, string } from 'prop-types'
import styled from 'styled-components'

import en from './locales/en'

counterpart.registerTranslations('en', en)

// Selecting the div here to resize the gap between label and icon
const StyledAnchor = styled(Anchor)`
  & div {
    width: 10px
  }
`

const StyledParagraph = styled(Paragraph)`
  font-weight: bold;
`

function Introduction (props) {
  const { description, linkProps, title } = props
  const linkText = counterpart('Introduction.link')
  const link = {
    ...linkProps,
    text: linkText
  }
  return (
    <Box>
      <Box margin={{ bottom: 'xsmall' }}>
        <SpacedText weight='bold'>
          {title}
        </SpacedText>
      </Box>
      <StyledParagraph margin={{ bottom: 'small', top: 'none' }} size='xxlarge'>
        {description}
      </StyledParagraph>
      <NavLink
        gap='xsmall'
        icon={<Next color='light-5' size='12px' />}
        link={link}
        reverse
        StyledAnchor={StyledAnchor}
      />
    </Box>
  )
}

Introduction.propTypes = {
  description: string.isRequired,
  linkProps: object.isRequired,
  title: string.isRequired
}

export default Introduction
