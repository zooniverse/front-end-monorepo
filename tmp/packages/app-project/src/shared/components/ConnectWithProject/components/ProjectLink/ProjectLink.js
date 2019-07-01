import { SpacedText } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Anchor, Box, Text } from 'grommet'
import Link from 'next/link'
import { shape, string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import en from './locales/en'
import formatUrlObject from './helpers/formatUrlObject'

counterpart.registerTranslations('en', en)

const StyledAnchor = styled(Anchor)`
  font-weight: 200;
  text-transform: uppercase;
`

function ProjectLink ({ className, urlObject }) {
  const { IconComponent, label, type, url } = formatUrlObject(urlObject)
  return (
    <Box className={className} direction='row'>
      <Box margin={{ right: '15px' }}>
        <IconComponent color='dark-5' size='medium' />
      </Box>
      <Box gap='xxsmall'>
        <SpacedText>
          <Link href={url} passHref>
            <StyledAnchor size='small'>
              {label}
            </StyledAnchor>
          </Link>
        </SpacedText>
        <Box area='type'>
          <Text
            color={{
              dark: 'light-5',
              light: 'dark-5'
            }}
            size='small'
            weight='bold'
          >
            {type}
          </Text>
        </Box>
      </Box>
    </Box>
  )
}

ProjectLink.propTypes = {
  urlObject: shape({
    label: string,
    path: string,
    site: string,
    url: string
  })
}

export default ProjectLink
