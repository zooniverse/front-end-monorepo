import { SpacedText } from '@zooniverse/react-components'
import { Anchor } from 'grommet'
import Link from 'next/link'
import { withRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'

import addQueryParams from '@helpers/addQueryParams'

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
  const { link, router } = props
  const { as, href, text } = link
  const isCurrentPage = router.pathname === href
  const isPFELink = !as

  const label = <StyledSpacedText children={text} color='white' weight='bold' />

  if (isCurrentPage) {
    return (
      <StyledAnchor label={label} />
    )
  } else if (isPFELink) {
    return (
      <StyledAnchor label={label} href={addQueryParams(href, router)} />
    )
  } else {
    return (
      <Link as={addQueryParams(as, router)} href={href} passHref>
        <StyledAnchor label={label} />
      </Link>
    )
  }
}

export default withRouter(NavLink)
export { NavLink }
