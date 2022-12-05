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

// TODO: This component is causing a styled-components error and needs a fix
function NavListItem ({ className, color, label, theme, url }) {
  return (
    <StyledNavListItem className={className} color={color} href={url} theme={theme} >
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
  theme: {
    global: {
      colors: {}
    }
  }
}

NavListItem.propTypes = {
  color: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  theme: PropTypes.object,
  url: PropTypes.string.isRequired
}

export default withTheme(NavListItem)
export { NavListItem }
