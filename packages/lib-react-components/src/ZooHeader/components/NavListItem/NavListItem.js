import zooTheme from '@zooniverse/grommet-theme'
import { Anchor } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import SpacedText from '../../../SpacedText'

export const StyledNavListItem = styled(Anchor)`
  border-bottom: 2px solid transparent;
  color: #B2B2B2;
  display: inline-block;
  margin-right: 1.5em;
  text-decoration: none !important;
  white-space: nowrap;

  &:visited {
    color: #B2B2B2;
  }

  &:hover, &:focus {
    border-bottom-color: ${zooTheme.global.colors.teal};
  }
`

export default function NavListItem ({ label, url }) {
  return (
    <StyledNavListItem href={url}>
      <SpacedText
        size='xsmall'
        weight='bold'
      >
        {label}
      </SpacedText>
    </StyledNavListItem>
  )
}

NavListItem.propTypes = {
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  url: PropTypes.string.isRequired
}
