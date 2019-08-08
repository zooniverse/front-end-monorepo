import { SpacedText } from '@zooniverse/react-components'
import { Anchor } from 'grommet'
import Link from 'next/link'
import { withRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'

const StyledSpacedText = styled(SpacedText)`
  text-shadow: 0 2px 2px rgba(0, 0, 0, 0.22);
`

const StyledAnchor = styled(Anchor)`
  border-bottom: 3px solid transparent;
  &:hover {
    text-decoration: none;
  }
  &[href]:hover {
    border-bottom-color: white;
  }
  &:not([href]) {
    cursor: default;
    border-bottom-color: white;
  }
`

function NavLink (props) {
  const { className, link, router } = props
  const { as, href, text } = link

  const anchor = (
    <StyledAnchor
      className={className}
      label={(
        <StyledSpacedText children={text} color='white' weight='bold' />
      )}
    />
  )

  if (router.pathname === href) {
    return anchor
  } else {
    return (
      <Link as={as} href={href} passHref>
        {anchor}
      </Link>
    )
  }
}

export default withRouter(NavLink)
export { NavLink }
