import React from 'react'
import PropTypes from 'prop-types'

import { Anchor } from 'grommet'

import styled from 'styled-components'

export const StyledNavListItem = styled(Anchor)`
  border-bottom: 2px solid transparent;
  color: #B2B2B2;
  display: inline-block;
  font-size: .75em;
  font-weight: 700;
  letter-spacing: 0.15em;
  line-height: 2em;
  margin-right: 2em;
  text-decoration: none !important;
  text-transform: uppercase;
  white-space: nowrap;

  &:visited {
    color: #B2B2B2;
  }

  &:hover, &:focus {
    border-bottom-color: #00979D;
  }
`

export default function NavListItem ({ label, url }) {
  return (
    <StyledNavListItem href={url}>
      {label}
    </StyledNavListItem>
  )
}

NavListItem.propTypes = {
  label: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}
