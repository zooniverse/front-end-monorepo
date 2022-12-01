import { Anchor, Box } from 'grommet'
import { string } from 'prop-types'
import styled from 'styled-components'

import ZooniverseLogotype from '../../../ZooniverseLogotype'
import SpacedText from '../../../SpacedText'

export const StyledLogoAnchor = styled(Anchor)`
  transition: color 0.2s linear;
`

export default function LogoAndTagline ({ className, tagLine }) {
  const color = {
    dark: 'light-3',
    light: 'black'
  }

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
        size='medium'
        weight='bold'
      >
        {tagLine}
      </SpacedText>
    </Box>
  )
}

LogoAndTagline.propTypes = {
  className: string,
  tagLine: string.isRequired
}
