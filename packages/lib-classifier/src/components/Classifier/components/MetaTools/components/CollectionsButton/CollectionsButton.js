import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import theme from 'styled-theming'
import zooTheme from '@zooniverse/grommet-theme'
import { PlainButton } from '@zooniverse/react-components'
import CollectionsIcon from './CollectionsIcon'

import en from './locales/en'

counterpart.registerTranslations('en', en)

export const Collect = styled(CollectionsIcon)`
  stroke: ${theme('mode', {
    dark: zooTheme.global.colors.text.dark,
    light: zooTheme.global.colors.text.light
  })};
  width: 1em;
`

export default function CollectionsButton (props) {
  const { onClick, theme } = props
  return (
    <ThemeProvider theme={{ mode: theme }}>
      <PlainButton
        icon={<Collect />}
        text={counterpart('CollectionsButton.add')}
        onClick={onClick}
      />
    </ThemeProvider>
  )
}

CollectionsButton.propTypes = {
  onClick: PropTypes.func,
  theme: PropTypes.string
}

CollectionsButton.defaultProps = {
  onClick: () => false,
  theme: 'light'
}
