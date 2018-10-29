import React from 'react'
import PropTypes from 'prop-types'

import { Anchor } from 'grommet'

import styled, { ThemeProvider } from 'styled-components'
import theme from 'styled-theming'
import { whichTealColorForTheme } from '../../lib'

export const StyledNavListItem = styled(Anchor)`
  &:first-child {
    color: ${whichTealColorForTheme};
    font-weight: bold;
    letter-spacing: 1px;
    margin-bottom: 0.5em;
    text-transform: uppercase;
  }

  &:not(:first-child) {
    color: ${theme('mode', { light: '#5C5C5C', dark: 'inherit' })};
  }
  font-size: 0.8em;
  font-weight: bold;
`

export default function NavListItem ({ colorTheme, label, url }) {
  return (
    <ThemeProvider theme={{ mode: colorTheme }}>
      <StyledNavListItem href={url}>
        {label}
      </StyledNavListItem>
    </ThemeProvider>
  )
}

NavListItem.defaultProps = {
  colorTheme: 'light'
}

NavListItem.propTypes = {
  colorTheme: PropTypes.oneOf(['light', 'dark']),
  label: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}
