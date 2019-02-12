import { Anchor, Box, Image } from 'grommet'
import { string } from 'prop-types'
import React from 'react'
import styled, { ThemeProvider } from 'styled-components'

import ZooniverseLogotype from '../../../ZooniverseLogotype'
import SpacedText from '../../../SpacedText'

export const StyledLogoAnchor = styled(Anchor)`
  transition: color 0.2s linear;
`

export default function LogoAndTagline ({ colorTheme, tagLine }) {
  const color = colorTheme === 'light' ? 'black' : 'lightGrey'
  return (
    <Box>
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
