import { Anchor, Box } from 'grommet'
import { string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import ZooniverseLogotype from '../../../ZooniverseLogotype'
import SpacedText from '../../../SpacedText'

export const StyledLogoAnchor = styled(Anchor)`
  transition: color 0.2s linear;
`

export default function LogoAndTagline ({ className, colorTheme, tagLine }) {
  const color = colorTheme === 'light' ? 'black' : 'light-3'
  return (
    <Box className={className}>
      <StyledLogoAnchor
        color={color}
        href='https://www.zooniverse.org'
      >
        <ZooniverseLogotype id='FooterZooniverseLogo' />
      </StyledLogoAnchor>
      <SpacedText
        color={color}
        weight='bold'
      >
        {tagLine}
      </SpacedText>
    </Box>
  )
}

LogoAndTagline.propTypes = {
  colorTheme: string.isRequired,
  tagLine: string.isRequired
}
