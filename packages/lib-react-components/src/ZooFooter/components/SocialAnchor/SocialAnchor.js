import { Anchor } from 'grommet'
import { FacebookOption, Twitter, Instagram } from 'grommet-icons'
import { objectOf, oneOf, string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import zooTheme from '@zooniverse/grommet-theme'

const StyledAnchor = styled(Anchor)`
  &:focus > svg,
  &:hover > svg {
    fill: ${zooTheme.global.colors['accent-2']} !important;
  }
`

export default function SocialAnchor ({ className, hrefs, service }) {
  const icons = {
    facebook: <FacebookOption size='25px' />,
    instagram: <Instagram size='25px' />,
    twitter: <Twitter size='25px' />
  }

  return (
      <StyledAnchor
        className={className}
        href={hrefs[service]}
        a11yTitle={service}
        icon={icons[service]}
      />
  )
}

SocialAnchor.defaultProps = {
  colorTheme: 'light',
  hrefs: {
    facebook: 'https://www.facebook.com/therealzooniverse',
    instagram: 'https://www.instagram.com/the.zooniverse/',
    twitter: 'https://twitter.com/the_zooniverse',
  }
}

SocialAnchor.propTypes = {
  colorTheme: oneOf(['light', 'dark']),
  hrefs: objectOf(string),
  service: string.isRequired
}
