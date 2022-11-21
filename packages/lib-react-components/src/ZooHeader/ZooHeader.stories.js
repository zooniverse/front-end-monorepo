import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import React from 'react'

import ZooHeader from './ZooHeader'
import readme from './README.md'

const signIn = action('Sign in button clicked')
const signOut = action('Sign out button clicked')

const config = {
  docs: {
    description: {
      component: readme
    }
  }
}

export default {
  title: 'Components / ZooHeader',
  component: ZooHeader,
  parameters: {
    viewport: {
      defaultViewport: 'responsive'
    },
    ...config
  }
}

export function SignedOut() {
  return (
    <Grommet theme={zooTheme} full>
      <ZooHeader
        signIn={signIn}
        signOut={signOut}
        user={{}}
      />
    </Grommet>
  )
}

export function SignedOutNarrowWindowView() {
  return (
    <Grommet theme={zooTheme} full>
      <ZooHeader
        isNarrow
        signIn={signIn}
        signOut={signOut}
        user={{}}
      />
    </Grommet>
  )
}

SignedOutNarrowWindowView.parameters = {
  viewport: {
    defaultViewport: 'iphone5'
  },
  ...config
}

export function SignedIn() {
  return (
    <Grommet theme={zooTheme} full>
      <ZooHeader
        signIn={signIn}
        signOut={signOut}
        user={{
          display_name: 'zootester1',
          login: 'zootester1'
        }}
      />
    </Grommet>
  )
}

export function SignedInNarrowWindowView({ unreadMessages, unreadNotifications }) {
  return(
    <Grommet theme={zooTheme} full>
      <ZooHeader
        isAdmin
        signIn={signIn}
        signOut={signOut}
        unreadMessages={unreadMessages}
        unreadNotifications={unreadNotifications}
        user={{
          admin: true,
          display_name: 'Zoo Tester',
          login: 'zootester1'
        }}
      />
    </Grommet>
  )
}
SignedInNarrowWindowView.args = {
  unreadNotifications: 0,
  unreadMessages: 3
}

SignedInNarrowWindowView.parameters = {
  viewport: {
    defaultViewport: 'iphone5'
  },
  ...config
}

export function SignedInAsAdmin() {
  return(
    <Grommet theme={zooTheme} full>
      <ZooHeader
        isAdmin
        signIn={signIn}
        signOut={signOut}
        user={{
          admin: true,
          display_name: 'zootester1',
          login: 'zootester1'
        }}
      />
    </Grommet>
  )
}

export function SignedInWithNotifications() {
  return(
    <Grommet theme={zooTheme} full>
      <ZooHeader
        signIn={signIn}
        signOut={signOut}
        unreadNotifications={3}
        user={{
          admin: true,
          display_name: 'zootester1',
          login: 'zootester1'
        }}
      />
    </Grommet>
  )
}

export function SignedInWithMessages() {
  return (
    <Grommet theme={zooTheme} full>
      <ZooHeader
        signIn={signIn}
        signOut={signOut}
        unreadMessages={3}
        user={{
          admin: true,
          display_name: 'zootester1',
          login: 'zootester1'
        }}
      />
    </Grommet>
  )
}
