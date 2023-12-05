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

export function ThemeToggleSignedIn({ signIn, signOut }) {
  const [themeMode, setThemeMode] = useState('light')
  function onThemeChange() {
    const newTheme = (themeMode === 'light') ? 'dark' : 'light'
    setThemeMode(newTheme)
  }

  return (
    <ZooHeader
      onThemeChange={onThemeChange}
      showThemeToggle
      signIn={signIn}
      signOut={signOut}
      themeMode={themeMode}
      user={{
        display_name: 'zootester1',
        login: 'zootester1'
      }}
    />
  )
}

export function ThemeToggleSignedOut({ signIn, signOut }) {
  const [themeMode, setThemeMode] = useState('light')
  function onThemeChange() {
    const newTheme = (themeMode === 'light') ? 'dark' : 'light'
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


export function SignedInAdminMode({ signIn, signOut }) {
  return (
    <ZooHeader
      adminMode
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
