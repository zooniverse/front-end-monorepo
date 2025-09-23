import { Anchor, Box } from 'grommet'
import { string } from 'prop-types'
import styled from 'styled-components'

import ZooniverseLogotype from '../../../ZooniverseLogotype'
import SpacedText from '../../../SpacedText'

const color = {
  dark: 'light-3',
  light: 'black'
}

const StyledAnchor = styled(Anchor)`
  width: fit-content;
`

export default function LogoAndTagline({ size, tagLine }) {
  return (
    <Box justify='center'>
      <StyledAnchor
        color={color}
        margin={{ bottom: size === 'small' ? '5px' : '10px' }}
        href='https://www.zooniverse.org'
      >
        <ZooniverseLogotype
          id='FooterZooniverseLogo'
          width={size === 'large' ? 220 : size === 'medium' ? 220 : 158}
        />
      </StyledAnchor>
      <SpacedText
        color={color}
        size={size === 'small' ? '0.6rem' : '0.875rem'}
        weight='bold'
      >
        {tagLine}
      </SpacedText>
    </Box>
  )
}

LogoAndTagline.propTypes = {
  size: string,
  tagLine: string.isRequired
}
