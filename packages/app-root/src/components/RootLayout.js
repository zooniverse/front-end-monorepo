'use client'

import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import { base as baseTheme } from 'grommet'
import { ZooHeader, ZooFooter } from '@zooniverse/react-components'

const theme = { ...baseTheme, ...zooTheme }

export default function RootLayout({ children }) {
  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={theme}
    >
      <ZooHeader />
      <main>{children}</main>
      <ZooFooter />
    </Grommet>
  )
}
