import { SpacedText } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Anchor, Box, Paragraph } from 'grommet'
import { Next } from 'grommet-icons'
import Link from 'next/link'
import { object, string } from 'prop-types'
import React from 'react'
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

function Introduction(props) {
  const { description, link, title } = props
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
      <Link {...link} passHref>
        <StyledAnchor
          gap='xsmall'
          icon={<Next color='light-5' size='12px' />}
          label={<SpacedText>{counterpart('Introduction.link')}</SpacedText>}
          reverse
        />
      </Link>
    </Box>
  )
}

Introduction.propTypes = {
  description: string.isRequired,
  link: object.isRequired,
  title: string.isRequired,
}

export default Introduction
