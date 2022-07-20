import asyncStates from '@zooniverse/async-states'
import React from 'react'
import QuickTalk from './QuickTalk'

import zooTheme from '@zooniverse/grommet-theme'
import { Tab, Tabs } from '@zooniverse/react-components'
import { Box, Grommet } from 'grommet'

/*
Workaround: prevent "infinite rendering Tabs" in Grommet 2.25
If a Grommet <Tab> is defined in a separate function than the parent Grommet
<Tabs>, it may cause an "infinite rendering loop" with the error message:
"Warning: Maximum update depth exceeded". One solution is to wrap the child
<Tab> in a React.memo.
*/
const QuickTalkForStorybook = React.memo(QuickTalk)

export default {
  title: 'Other / QuickTalk',
  component: QuickTalk,
  args: {
    dark: false,
    loggedIn: false,
    containerWidth: '400px',
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
    created_at: '2022-07-19T13:00:00.000Z',
    is_deleted: false,
    user_id: '300001',
    user_login: 'zootester',
  },
  {
    id: '200002',
    body: 'This is the second comment',
    created_at: '2022-07-20T15:30:00.000Z',
    is_deleted: false,
    user_id: '300001',
    user_login: 'zootester',
  },
  {
    id: '200003',
    body: 'This is the third comment',
    created_at: '2022-07-20T16:00:00.000Z',
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

export function Default({ dark, loggedIn, containerWidth }) {
  const themeMode = dark ? 'dark' : 'light'
  return (
    <Grommet
      background={background}
      theme={zooTheme}
      themeMode={themeMode}
    >
      <Box border={true} width={containerWidth}>
        <Tabs>
          <QuickTalkForStorybook
            subject={subject}
            comments={comments}
            authors={authors}
            authorRoles={authorRoles}
            userId={(loggedIn) ? loggedInUserId : undefined}
          />
          <Tab title='Other'>
            Nothing here! The 'Other' tab was just added to show how the grouped tabs look like visually.
          </Tab>
        </Tabs>
      </Box>
    </Grommet>
  )
}
