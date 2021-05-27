import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import React from 'react'

import { AuthenticationInvitationConnector } from './AuthenticationInvitationConnector'
import readme from './README.md'

export default {
  title: 'Project App / Screens / Project Home / Announcements / AuthenticationInvitation',
  component: AuthenticationInvitationConnector,
  args: {
    dark: false
  },
  notes: {
    markdown: readme
  },
  parameters: {
    viewport: {
      defaultViewport: 'responsive'
    }
  }
}

const stores = {
  project: {
    isComplete: false
  },
  ui: {
    dismissProjectAnnouncementBanner: () => {},
    showAnnouncement: true
  },
  user: {
    isLoggedIn: false
  },
  yourStats: {
    sessionCount: 5
  }
}


function StoryContext(props) {
  const { children, theme } = props

  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={theme}
      themeMode={(theme.dark) ? 'dark' : 'light'}
    >
      <Provider store={stores}>
        {children}
      </Provider>
    </Grommet>
  )
}

export const Default = ({ dark }) => (
  <StoryContext theme={{ ...zooTheme, dark }}>
    <AuthenticationInvitationConnector />
  </StoryContext>
)

Default.args = {
  dark: false
}
