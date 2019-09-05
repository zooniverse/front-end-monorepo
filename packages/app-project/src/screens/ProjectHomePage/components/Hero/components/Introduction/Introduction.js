import { SpacedText } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Anchor, Box, Paragraph, Text } from 'grommet'
import { Next } from 'grommet-icons'
import Link from 'next/link'
import { object, string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import en from './locales/en'

counterpart.registerTranslations('en', en)

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
        <Anchor
          gap='xsmall'
          icon={<Next color='light-5' />}
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
