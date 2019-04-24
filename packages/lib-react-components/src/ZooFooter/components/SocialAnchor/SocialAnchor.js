import zooTheme from '@zooniverse/grommet-theme'
import { Anchor } from 'grommet'
import { FacebookOption, Twitter, Instagram } from 'grommet-icons'
import { objectOf, oneOf, string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const StyledAnchor = styled(Anchor)`
  padding: 0;

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
        a11yTitle={service}
        className={className}
        icon={icons[service]}
        href={hrefs[service]}
      />
  )
}

SocialAnchor.defaultProps = {
  hrefs: {
    facebook: 'https://www.facebook.com/therealzooniverse',
    instagram: 'https://www.instagram.com/the.zooniverse/',
    twitter: 'https://twitter.com/the_zooniverse',
  }
}

SocialAnchor.propTypes = {
  hrefs: objectOf(string),
  service: string.isRequired
}
