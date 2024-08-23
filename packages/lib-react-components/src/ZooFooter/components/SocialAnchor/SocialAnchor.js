import { Anchor } from 'grommet'
import { FacebookOption, Instagram, X } from 'grommet-icons'
import { objectOf, string } from 'prop-types'
import styled from 'styled-components'

const StyledAnchor = styled(Anchor)`
  padding: 0;
`

const defaultHrefs = {
  facebook: 'https://www.facebook.com/therealzooniverse',
  instagram: 'https://www.instagram.com/the.zooniverse/',
  twitter: 'https://x.com/the_zooniverse',
}

function SocialAnchor ({ className = '', hrefs = defaultHrefs, service }) {
  const icons = {
    facebook: <FacebookOption size='25px' />,
    instagram: <Instagram size='25px' />,
    twitter: <X size='25px' />
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

SocialAnchor.propTypes = {
  className: string,
  hrefs: objectOf(string),
  service: string.isRequired
}

export default SocialAnchor
