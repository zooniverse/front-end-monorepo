import { Anchor } from 'grommet'
import { node, object, oneOfType, string } from 'prop-types'
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
  color: string,
  label: oneOfType([node, string]).isRequired,
  margin: object,
  url: string.isRequired
}

export default NavListItem
