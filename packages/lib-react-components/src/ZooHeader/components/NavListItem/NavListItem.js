import zooTheme from '@zooniverse/grommet-theme'
import { Anchor } from 'grommet'
import PropTypes from 'prop-types'
import styled, { css, withTheme } from 'styled-components'

import SpacedText from '../../../SpacedText'

export const StyledNavListItem = styled(Anchor)`
  border-bottom: 2px solid transparent;
  ${props => css`color: ${props.color};`}
  text-decoration: none !important;
  white-space: nowrap;

  &:visited {
    ${props => css`color: ${props.color};`}
  }

  &:hover, &:focus {
    ${props => css`border-bottom-color: ${props.theme.global.colors.brand};`}
  }
`

function NavListItem ({ className, color = '#B2B2B2', label, margin, theme, url }) {
  return (
    <StyledNavListItem className={className} color={color} href={url} margin={margin} theme={theme} >
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
  theme: PropTypes.object,
  url: PropTypes.string.isRequired
}

export default withTheme(NavListItem)
export { NavListItem }
