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
  notes: {
    markdown: readme
  }
}

storiesOf('ZooHeader', module)

  .add('Signed out', () => (
    <Grommet theme={zooTheme} full>
      <ZooHeader
        signIn={signIn}
        signOut={signOut}
        user={{}}
      />
    </Grommet>
  ), { viewport: { defaultViewport: 'responsive' }, ...config })

  .add('Signed out narrow window view', () => (
    <Grommet theme={zooTheme} full>
      <ZooHeader
        isNarrow
        signIn={signIn}
        signOut={signOut}
        user={{}}
      />
    </Grommet>
  ), { viewport: { defaultViewport: 'iphone5' }, ...config })

  .add('Signed in', () => (
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
  ), { viewport: { defaultViewport: 'responsive' }, ...config })

  .add('Signed in narrow window view', () => (
    <Grommet theme={zooTheme} full>
      <ZooHeader
        isNarrow
        signIn={signIn}
        signOut={signOut}
        user={{
          admin: true,
          display_name: 'zootester1',
          login: 'zootester1'
        }}
      />
    </Grommet>
  ), { viewport: { defaultViewport: 'iphone5' }, ...config })

  .add('Signed in as admin', () => (
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
  ), { viewport: { defaultViewport: 'responsive' }, ...config })

  .add('Signed in with notifications', () => (
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
  ), { viewport: { defaultViewport: 'responsive' }, ...config })

  .add('Signed in with messages', () => (
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
  ), { viewport: { defaultViewport: 'responsive' }, ...config })
