import { Anchor } from 'grommet'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import SpacedText from '../../../SpacedText'

export const StyledNavListItem = styled(Anchor)`
  border-bottom: 2px solid transparent;
  border-top: 2px solid transparent; // to help align-items center in nav
  ${props => css`color: ${props.color};`}
  text-decoration: none !important;
  white-space: nowrap;

  &:hover, &:focus {
    ${props => css`border-bottom-color: ${props.theme.global.colors.brand};`}
  }
`

function NavListItem ({ className, color = '#B2B2B2', label, margin, url }) {
  return (
    <StyledNavListItem className={className} color={color} href={url} margin={margin} >
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
  color: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  margin: PropTypes.object,
  url: PropTypes.string.isRequired
}

export default NavListItem
