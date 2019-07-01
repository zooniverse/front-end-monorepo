import zooTheme from '@zooniverse/grommet-theme'
import { Anchor } from 'grommet'
import { FacebookOption, Twitter, Instagram } from 'grommet-icons'
import { objectOf, oneOf, string } from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'

const StyledAnchor = styled(Anchor)`
  padding: 0;

  &:focus > svg,
  &:hover > svg {
    fill: ${props => props.dark
      ? `${zooTheme.global.colors['brand']} !important`
      : `${zooTheme.global.colors['accent-2']} !important`
    };
  }
`

function SocialAnchor (props) {
  const { className, hrefs, service, theme: { dark } } = props
  const icons = {
    facebook: <FacebookOption size='25px' />,
    instagram: <Instagram size='25px' />,
    twitter: <Twitter size='25px' />
  }

  return (
      <StyledAnchor
        a11yTitle={service}
        className={className}
        dark={dark}
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

export default withTheme(SocialAnchor)
export { SocialAnchor }
