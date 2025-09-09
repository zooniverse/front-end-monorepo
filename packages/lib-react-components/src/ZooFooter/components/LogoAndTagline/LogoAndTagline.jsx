import { Anchor, Box } from 'grommet'
import { string } from 'prop-types'

import ZooniverseLogotype from '../../../ZooniverseLogotype'
import SpacedText from '../../../SpacedText'

const color = {
  dark: 'light-3',
  light: 'black'
}

export default function LogoAndTagline ({ className, tagLine }) {
  return (
    <Box className={className}>
      <Anchor
        color={color}
        margin={{ bottom: '5px' }}
        href='https://www.zooniverse.org'
      >
        <ZooniverseLogotype id='FooterZooniverseLogo' />
      </Anchor>
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
