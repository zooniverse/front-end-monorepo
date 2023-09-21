'use client'

import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import { base as baseTheme } from 'grommet'

const theme = { ...baseTheme, ...zooTheme }

function GrommetContainer({ children }) {
  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={theme}
      themeMode='light'
    >
      {children}
    </Grommet>
  )
}

export default GrommetContainer
