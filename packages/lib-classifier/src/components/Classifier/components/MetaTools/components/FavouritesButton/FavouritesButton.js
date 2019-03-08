import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import theme from 'styled-theming'
import { Icon } from 'grommet-icons'
import zooTheme from '@zooniverse/grommet-theme'
import { PlainButton } from '@zooniverse/react-components'
import HeartIcon from './HeartIcon'

import en from './locales/en'

counterpart.registerTranslations('en', en)

export const Favourite = styled(HeartIcon)`
  fill: ${props => props.filled ? '#E45950' : 'none'};
  stroke: ${theme('mode', {
    dark: zooTheme.global.colors.text.dark,
    light: zooTheme.global.colors.text.light
  })};
  width: 1em;
`

export default function FavouritesButton (props) {
  const { checked, onClick, theme } = props
  const label = checked ? 'FavouritesButton.remove' : 'FavouritesButton.add'
  return (
    <ThemeProvider theme={{ mode: theme }}>
      <PlainButton
        aria-checked={checked}
        icon={<Favourite filled={checked ? "true" : undefined} />}
        margin={{ vertical: 'small', left: 'none', right: 'medium' }}
        role='checkbox'
        text={counterpart(label)}
        onClick={onClick}
      />
    </ThemeProvider>
  )
}

FavouritesButton.propTypes = {
  checked: PropTypes.bool,
  theme: PropTypes.string,
  onClick: PropTypes.func
}

FavouritesButton.defaultProps = {
  checked: false,
  onClick: () => false,
  theme: 'light'
}
