import asyncStates from '@zooniverse/async-states'
import React from 'react'
import QuickTalk from './QuickTalk'

import zooTheme from '@zooniverse/grommet-theme'
import { Tabs } from '@zooniverse/react-components'
import { Grommet } from 'grommet'

export default {
  title: 'Other / QuickTalk',
  component: QuickTalk,
  args: {
    dark: false,
    loggedIn: false,
  },
  parameters: {
    viewport: {
      defaultViewport: 'responsive'
    }
  }
}

const background = {
  dark: 'dark-1',
  light: 'light-1'
}

const subject = {
  id: '100001',
  talkURL: 'https://www.zooniverse.org/projects/zootester/test-project/talk/subjects/100001',
}

const comments = [
  {
    id: '200001',
    body: 'This is the first comment',
    is_deleted: false,
    user_id: '300001',
    user_login: 'zootester',
  },
  {
    id: '200002',
    body: 'This is the second comment',
    is_deleted: false,
    user_id: '300001',
    user_login: 'zootester',
  },
  {
    id: '200003',
    body: 'This is the third comment',
    is_deleted: false,
    user_id: '300002',
    user_login: 'randomdude',
  },
]

const authors = {
  '300001': {
    id: '300001',
    avatar_src: null,
    credited_name: 'zootester',
    display_name: 'Zooniverse Tester',
    login: 'zootester',
  },
  '300002': {
    avatar_src: null,
    login: 'randomdude',
    credited_name: 'randomdude',
    display_name: 'Random Dude',
    login: 'randomdude',
  },
}

const authorRoles = {
  '300001': [{ name: 'admin', section: 'project-1234' }],
  '300002': [],
}

const loggedInUserId = '300001'

export function Default({ dark, loggedIn }) {
  const themeMode = dark ? 'dark' : 'light'
  return (
    <Grommet
      background={background}
      theme={zooTheme}
      themeMode={themeMode}
    >
      <Tabs>
        <QuickTalk
          subject={subject}
          comments={comments}
          authors={authors}
          authorRoles={authorRoles}
          userId={(loggedIn) ? loggedInUserId : undefined}
        />
      </Tabs>
    </Grommet>
  )
}
