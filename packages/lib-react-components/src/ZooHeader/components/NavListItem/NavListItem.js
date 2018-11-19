import zooTheme from '@zooniverse/grommet-theme'
import { Anchor } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import SpacedText from '../../../SpacedText'

export const StyledNavListItem = styled(Anchor)`
  border-bottom: 2px solid transparent;
  color: ${props => props.color};
  display: inline-block;
  margin-right: ${props => props.marginRight};
  text-decoration: none !important;
  white-space: nowrap;

  &:visited {
    color: ${props => props.color};
  }

  &:hover, &:focus {
    border-bottom-color: ${zooTheme.global.colors.teal};
  }
`

export default function NavListItem ({ color, label, marginRight, url }) {
  return (
    <StyledNavListItem color={color} href={url} marginRight={marginRight} >
      <SpacedText
        size='xsmall'
        weight='bold'
      >
        {label}
      </SpacedText>
    </StyledNavListItem>
  )
}

NavListItem.defaultProps = {
  color: '#B2B2B2',
  marginRight: '1.5em'
}

NavListItem.propTypes = {
  color: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  marginRight: PropTypes.string,
  url: PropTypes.string.isRequired
}
