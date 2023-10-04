'use client'
/**
 * Note that all child components are now client components.
 * If we want children of RootLayout to be server components
 * a ZooHeaderContainer and ZooFooterContainer could be created instead.
 */

import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import { ZooHeader, ZooFooter } from '@zooniverse/react-components'

export default function RootLayout({ children }) {
  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
    >
      <ZooHeader />
      {children}
      <ZooFooter />
    </Grommet>
  )
}
