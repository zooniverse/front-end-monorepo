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

export default function ProjectLink ({ urlObject }) {
  const { IconComponent, label, type, url } = formatUrlObject(urlObject)
  return (
    <Box direction='row' margin={{ bottom: 'small' }}>
      <Box margin={{ right: '15px' }}>
        <IconComponent color='#5c5c5c' size='medium' />
      </Box>
      <Box>
        <SpacedText>
          <Link href={url} passHref>
            <StyledAnchor color='#005D69' size='small'>
              {label}
            </StyledAnchor>
          </Link>
        </SpacedText>
        <Box area='type'>
          <Text color='#5c5c5c' size='small' weight='bold'>
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
