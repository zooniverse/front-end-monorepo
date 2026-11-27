import { Anchor } from 'grommet'
import { string } from 'prop-types'
import styled from 'styled-components'

const StyledMediaLink = styled(Anchor)`
  inset: 0;
  position: absolute;
  text-decoration: none;
  outline: none;
  z-index: 3;

  &:focus-visible {
    box-shadow: 0 0 0 2px ${props => props.theme.global.colors['accent-1']};
    outline: none;
  }

  &:hover {
    text-decoration: none;
  }
`

function MediaLink({ href, title }) {
  return (
    <StyledMediaLink
      a11yTitle={title}
      href={href}
    />
  )
}

MediaLink.propTypes = {
  href: string.isRequired,
  title: string.isRequired
}

export default MediaLink
