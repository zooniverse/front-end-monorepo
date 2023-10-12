'use client'
/**
 * Note that all child components are now client components.
 * If we want children of RootLayout to be server components
 * a ZooHeaderContainer and ZooFooterContainer could be created instead.
 */

import { createGlobalStyle } from 'styled-components'
import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'

import PageHeader from './PageHeader.js'
import PageFooter from './PageFooter.js'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`

export default function RootLayout({ children }) {
  return (
    <body>
      <GlobalStyle />
      <Grommet
        background={{
          dark: 'dark-1',
          light: 'light-1'
        }}
        theme={zooTheme}
      >
        <PageHeader />
        {children}
        <PageFooter />
      </Grommet>
    </body>
  )
}
