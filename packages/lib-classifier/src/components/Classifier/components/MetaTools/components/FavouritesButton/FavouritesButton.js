import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import theme from 'styled-theming'
import { Icon } from 'grommet-icons'
import zooTheme  from '@zooniverse/grommet-theme'
import { PlainButton } from '@zooniverse/react-components'
import HeartIcon from './HeartIcon'

import en from './locales/en'

counterpart.registerTranslations('en', en)

const Favourite = styled(HeartIcon)`
  fill: none;
  stroke: ${theme('mode', {
    dark: zooTheme.dark.colors.font,
    light: zooTheme.light.colors.font
  })};
  width: 1em;
`

  const IsFavourite = styled(Favourite)`
  fill: #E45950;
`

export default function FavouritesButton (props) {
  const { checked, mode, onClick } = props
  const Icon = checked ? IsFavourite : Favourite
  const label = checked ? 'FavouritesButton.remove' : 'FavouritesButton.add'
  return (
    <PlainButton
      aria-checked={checked}
      icon={<Icon />}
      margin={{ vertical: 'small', left: 'none', right: 'medium' }}
      role='checkbox'
      text={counterpart(label)}
      onClick={onClick}
    />
  )
}

FavouritesButton.propTypes = {
  checked: PropTypes.bool,
  mode: PropTypes.string,
  onClick: PropTypes.func
}

FavouritesButton.defaultProps = {
  checked: false,
  mode: 'light',
  onClick: () => false
}
