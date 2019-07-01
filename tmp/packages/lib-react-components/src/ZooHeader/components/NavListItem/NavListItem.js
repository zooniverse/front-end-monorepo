import zooTheme from '@zooniverse/grommet-theme'
import { Anchor } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import SpacedText from '../../../SpacedText'

export const StyledNavListItem = styled(Anchor)`
  border-bottom: 2px solid transparent;
  color: ${props => props.color};
  text-decoration: none !important;
  white-space: nowrap;

  &:visited {
    color: ${props => props.color};
  }

  &:hover, &:focus {
    border-bottom-color: ${zooTheme.global.colors.brand};
  }
`

// TODO: This component is causing a styled-components error and needs a fix
export default function NavListItem ({ className, color, label, url }) {
  return (
    <StyledNavListItem className={className} color={color} href={url} >
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
  color: '#B2B2B2'
}

NavListItem.propTypes = {
  color: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  url: PropTypes.string.isRequired
}
