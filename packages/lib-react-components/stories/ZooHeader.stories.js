import React from 'react'
import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { ZooHeader } from '../src'
import headerDocs from '../src/ZooHeader/README.md'

const signIn = action('Sign in button clicked')
const signOut = action('Sign out button clicked')

storiesOf('ZooHeader', module)
  .addParameters({
    info: headerDocs
  })
  .add('Signed out', () => (
    <Grommet theme={zooTheme}>
      <ZooHeader signIn={signIn} signOut={signOut} user={{}} />
    </Grommet>
  ))
  .add('Signed in', () => (
    <Grommet theme={zooTheme}>
      <ZooHeader signIn={signIn} signOut={signOut} user={{ display_name: 'zootester1', login: 'zootester1' }} />
    </Grommet>
  ))
  .add('Signed in as admin', () => (
    <Grommet theme={zooTheme}>
      <ZooHeader isAdmin={true} signIn={signIn} signOut={signOut} user={{admin: true, display_name: 'zootester1', login: 'zootester1' }} />
    </Grommet>
  ))
  .add('Signed in with notifications', () => (
    <Grommet theme={zooTheme}>
      <ZooHeader unreadNotifications={3} signIn={signIn} signOut={signOut} user={{ admin: true, display_name: 'zootester1', login: 'zootester1' }} />
    </Grommet>
  ))
  .add('Signed in with messages', () => (
    <Grommet theme={zooTheme}>
      <ZooHeader unreadMessages={3} signIn={signIn} signOut={signOut} user={{ admin: true, display_name: 'zootester1', login: 'zootester1' }} />
    </Grommet>
  ))

