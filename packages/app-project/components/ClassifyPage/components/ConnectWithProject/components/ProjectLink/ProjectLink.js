import { SpacedText } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Anchor, Box, Grid, Text } from 'grommet'
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
      <Box color='#5c5c5c' margin={{ right: '10px' }} width='30px'>
        <IconComponent />
      </Box>
      <Box>
        <SpacedText>
          <Link href={url} passHref>
            <StyledAnchor color='#ADDDE0' size='small'>
              {label}
            </StyledAnchor>
          </Link>
        </SpacedText>
        <Box area='type'>
          <Text color='#A6A7A9' size='small' weight='bold'>
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
