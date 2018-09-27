import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Anchor } from 'grommet'
import SpacedText from '../../../SpacedText'
import zooTheme from '@zooniverse/grommet-theme'

export const StyledNavListItem = styled(Anchor)`
  border-bottom: 2px solid transparent;
  color: #B2B2B2;
  display: inline-block;
  margin-right: 2em;
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
        size="xsmall"
        weight="bold"
      >
        {label}
      </SpacedText>
    </StyledNavListItem>
  )
}

NavListItem.propTypes = {
  label: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}
