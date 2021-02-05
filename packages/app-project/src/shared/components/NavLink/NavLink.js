import { SpacedText } from '@zooniverse/react-components'
import { Anchor } from 'grommet'
import Link from 'next/link'
import { withRouter } from 'next/router'
import React from 'react'
import PropTypes from 'prop-types'

import addQueryParams from '@helpers/addQueryParams'


function NavLink ({
  color,
  link,
  router = {},
  StyledAnchor = Anchor,
  StyledSpacedText = SpacedText,
  weight,
  ...anchorProps
}) {
  const { as, href, text } = link
  const isCurrentPage = router?.pathname === href
  const isPFELink = !as

  const label = <StyledSpacedText children={text} color={color} weight={weight} />

  if (isCurrentPage) {
    return (
      <StyledAnchor color={color} label={label} {...anchorProps} />
    )
  } else if (isPFELink) {
    return (
      <StyledAnchor color={color} label={label} href={addQueryParams(href, router)} {...anchorProps} />
    )
  } else {
    return (
      <Link as={addQueryParams(as, router)} color={color} href={href} passHref>
        <StyledAnchor color={color} label={label} {...anchorProps} />
      </Link>
    )
  }
}

NavLink.propTypes = {
  color: PropTypes.string,
  link: PropTypes.shape({
    as: PropTypes.string,
    href: PropTypes.string,
    text: PropTypes.string
  }).isRequired,
  router: PropTypes.object,
  StyledAnchor: PropTypes.node,
  StyledSpacedText: PropTypes.node,
  weight: PropTypes.string
}

export default withRouter(NavLink)
export { NavLink }
