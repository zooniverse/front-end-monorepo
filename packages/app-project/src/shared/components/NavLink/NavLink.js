import { SpacedText } from '@zooniverse/react-components'
import { Anchor } from 'grommet'
import Link from 'next/link'
import { withRouter } from 'next/router'
import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import addQueryParams from '@helpers/addQueryParams'

const StyledSpacedText = styled(SpacedText)`
  text-shadow: 0 2px 2px rgba(0, 0, 0, 0.22);
`

const StyledAnchor = styled(Anchor)`
  border-bottom: 3px solid transparent;
  white-space: nowrap;

  &:hover {
    text-decoration: none;
  }
  ${props => props.color && css`
    &[href]:hover {
      border-bottom-color: ${props.color};
    }
    &:not([href]) {
      cursor: default;
      border-bottom-color: ${props.color};
    }
  `}

`

function NavLink (props) {
  const { color, link, router, weight } = props
  const { as, href, text } = link
  const isCurrentPage = router?.pathname === href
  const isPFELink = !as

  const label = <StyledSpacedText children={text} color={color} weight={weight} />

  if (isCurrentPage) {
    return (
      <StyledAnchor color={color} label={label} />
    )
  } else if (isPFELink) {
    return (
      <StyledAnchor color={color} label={label} href={addQueryParams(href, router)} />
    )
  } else {
    return (
      <Link as={addQueryParams(as, router)} color={color} href={href} passHref>
        <StyledAnchor color={color} label={label} />
      </Link>
    )
  }
}

NavLink.defaultProps = {
  color: 'white',
  router: {},
  weight: 'bold'
}

NavLink.propTypes = {
  color: PropTypes.string,
  link: PropTypes.shape({
    as: PropTypes.string,
    href: PropTypes.string,
    text: PropTypes.string
  }).isRequired,
  router: PropTypes.object,
  weight: PropTypes.string
}

export default withRouter(NavLink)
export { NavLink }
