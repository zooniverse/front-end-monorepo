import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'

import ZooHeader from './ZooHeader'
import readme from './README.md'

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
  args: {
    dark: false
  },
  argTypes: {
    signIn: {
      action: 'User signed in'
    },
    signOut: {
      action: 'User signed out'
    }
  },
  parameters: {
    ...config
  }
}

export function SignedOut({ dark, signIn, signOut }) {
  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode={dark ? 'dark' : 'light'}
    >
      <ZooHeader signIn={signIn} signOut={signOut} user={{}} />
    </Grommet>
  )
}

/** You can also see this using the 'Viewports' button in Storybook's toolbar */
export function SignedOutNarrowWindowView({ dark, signIn, signOut }) {
  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode={dark ? 'dark' : 'light'}
    >
      <ZooHeader isNarrow signIn={signIn} signOut={signOut} user={{}} />
    </Grommet>
  )
}

SignedOutNarrowWindowView.parameters = {
  ...config
}

export function SignedIn({ dark, signIn, signOut }) {
  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode={dark ? 'dark' : 'light'}
    >
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

export function SignedInNarrowWindowView({
  dark,
  signIn,
  signOut,
  unreadMessages,
  unreadNotifications
}) {
  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode={dark ? 'dark' : 'light'}
    >
      <Box width='400px'>
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
      </Box>
    </Grommet>
  )
}
SignedInNarrowWindowView.args = {
  unreadNotifications: 0,
  unreadMessages: 3
}

SignedInNarrowWindowView.parameters = {
  ...config
}

export function SignedInAsAdmin({ dark, signIn, signOut }) {
  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode={dark ? 'dark' : 'light'}
    >
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

export function SignedInWithNotifications({ dark, signIn, signOut }) {
  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode={dark ? 'dark' : 'light'}
    >
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

export function SignedInWithMessages({ dark, signIn, signOut }) {
  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode={dark ? 'dark' : 'light'}
    >
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
