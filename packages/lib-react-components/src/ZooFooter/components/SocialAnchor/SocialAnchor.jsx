import React from 'react'
import PropTypes from 'prop-types'

import { Anchor } from 'grommet'
import { FacebookOption, Twitter, Instagram } from 'grommet-icons'

import styled, { ThemeProvider } from 'styled-components'
import { whichTealColorForTheme } from '../../lib'

// Note: I shouldn't have to define the fill color
// This is a bug in v2: https://github.com/grommet/grommet/issues/2141
export const StyledSocialAnchor = styled(Anchor)`
  padding: 0;
  svg {
    border-bottom: solid thin transparent;
    fill: ${whichTealColorForTheme};
  }

  svg:hover, svg:focus {
    border-bottom: solid thin ${whichTealColorForTheme};
  }
`

export default function SocialAnchor ({ colorTheme, hrefs, service }) {
  const icons = {
    facebook: <FacebookOption size='small' />,
    instagram: <Instagram size='small' />,
    twitter: <Twitter size='small' />
  }

  return (
    <ThemeProvider theme={{ mode: colorTheme }}>
      <StyledSocialAnchor
        href={hrefs[service]}
        a11yTitle={service}
        icon={icons[service]}
      />
    </ThemeProvider>
  )
}

SocialAnchor.defaultProps = {
  colorTheme: 'light',
  hrefs: {
    facebook: 'https://www.facebook.com/therealzooniverse',
    twitter: 'https://twitter.com/the_zooniverse',
    instagram: 'https://www.instagram.com/the.zooniverse/'
  }
}

SocialAnchor.propTypes = {
  colorTheme: PropTypes.oneOf(['light', 'dark']),
  hrefs: PropTypes.objectOf(PropTypes.string),
  service: PropTypes.string.isRequired
}
