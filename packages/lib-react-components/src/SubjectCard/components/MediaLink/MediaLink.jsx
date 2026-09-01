import { Anchor, Box } from 'grommet'
import { node, string } from 'prop-types'
import styled from 'styled-components'

const StyledMediaLink = styled(Anchor)`
  display: block;
  text-decoration: none;
  width: 100%;
  outline: none;

  &:focus-visible {
    box-shadow: 0 0 0 2px ${props => props.theme.global.colors['accent-1']};
    outline: none;
    position: relative;
    z-index: 1;
  }

  &:hover {
    text-decoration: none;
  }
`

function MediaLink({ children, href, title }) {
  return (
    <StyledMediaLink
      a11yTitle={title}
      href={href}
    >
      {children}
    </StyledMediaLink>
  )
}

MediaLink.propTypes = {
  children: node.isRequired,
  href: string.isRequired,
  title: string.isRequired
}

export default MediaLink
