import { Box } from 'grommet'
import { useState } from 'react'

import ZooHeader from './ZooHeader'
import readme from './README.md'

export default {
  title: 'Components / ZooHeader',
  component: ZooHeader,
  argTypes: {
    signIn: {
      action: 'User signed in'
    },
    signOut: {
      action: 'User signed out'
    }
  },
  parameters: {
    docs: {
      description: {
        component: readme
      }
    }
  }
}

export function showThemeToggle({ signIn, signOut }) {
  const [themeMode, setThemeMode] = useState('light')
  function onThemeChange() {
    let newTheme
    if (themeMode === 'light') {
      newTheme = 'dark'
    } else {
      newTheme = 'light'
    }

    setThemeMode(newTheme)
  }

  return (
    <ZooHeader
      onThemeChange={onThemeChange}
      showThemeToggle
      signIn={signIn}
      signOut={signOut}
      themeMode={themeMode}
      user={{}}
    />
  )
}

export function SignedOut({ signIn, signOut }) {
  return <ZooHeader signIn={signIn} signOut={signOut} user={{}} />
}

/** You can also see this using the 'Viewports' button in Storybook's toolbar */
export function SignedOutNarrowWindowView({ signIn, signOut }) {
  return (
    <Box width='400px'>
      <ZooHeader isNarrow signIn={signIn} signOut={signOut} user={{}} />
    </Box>
  )
}

export function SignedIn({ signIn, signOut }) {
  return (
    <ZooHeader
      signIn={signIn}
      signOut={signOut}
      user={{
        display_name: 'zootester1',
        login: 'zootester1'
      }}
    />
  )
}

/** You can also see this using the 'Viewports' button in Storybook's toolbar */
export function SignedInNarrowWindowView({
  signIn,
  signOut,
  unreadMessages,
  unreadNotifications
}) {
  return (
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
  )
}
SignedInNarrowWindowView.args = {
  unreadNotifications: 0,
  unreadMessages: 3
}

export function SignedInAsAdmin({ signIn, signOut }) {
  return (
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
  )
}

export function SignedInWithNotifications({ signIn, signOut }) {
  return (
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
  )
}

export function SignedInWithMessages({ signIn, signOut }) {
  return (
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
  )
}
