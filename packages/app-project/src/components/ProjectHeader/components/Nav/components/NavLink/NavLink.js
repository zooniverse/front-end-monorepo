import { SpacedText } from '@zooniverse/react-components'
import { Anchor } from 'grommet'
import { withRouter } from 'next/router'
import Link from 'next/link'
import { shape, string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const StyledSpacedText = styled(SpacedText)`
  text-shadow: 0 2px 2px rgba(0, 0, 0, 0.22);
`

const StyledAnchor = styled(Anchor)`
  border-bottom: 3px solid transparent;
  &:hover,
  &:focus {
    text-decoration: none;
    border-color: white;
  }
  ${props => props.isActive && `
    border-color: white;
  `}
`

function NavLink (props) {
  const { as, href, router, text } = props
  const isActive = router.asPath.includes(href)

  return (
    <Link as={as} href={href} passHref>
      <StyledAnchor isActive={isActive}>
        <StyledSpacedText color='white' weight='bold'>
          {text}
        </StyledSpacedText>
      </StyledAnchor>
    </Link >
  )
}

NavLink.propTypes = {
  as: string.isRequired,
  href: string.isRequired,
  router: shape({
    asPath: string
  }),
  text: string.isRequired
}

export default withRouter(NavLink)
export { NavLink }
