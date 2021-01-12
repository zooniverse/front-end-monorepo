import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import React from 'react'

import SubjectSetPicker from './'
import { mockWorkflow } from './helpers'

function StoryContext (props) {
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
      {children}
    </Grommet>
  )
}

export default {
  title: 'Project App / Screens / Project Home / Subject Set Picker',
  component: SubjectSetPicker,
  parameters: {
    viewport: {
      defaultViewport: 'responsive'
    }
  }
}

export function Default({ active, dark, title, workflow }) {
  return (
    <StoryContext theme={{ ...zooTheme, dark }}>
      <SubjectSetPicker
        active={active}
        title={title}
        workflow={workflow}
      />
    </StoryContext>
  )
}
Default.args = {
  active: true,
  dark: false,
  title: "Question Workflow (grouped)",
  workflow: mockWorkflow
}

export function Tablet({ active, dark, title, workflow }) {
  return (
    <StoryContext theme={{ ...zooTheme, dark }}>
      <SubjectSetPicker
        active={active}
        title={title}
        workflow={workflow}
      />
    </StoryContext>
  )
}
Tablet.args = {
  active: true,
  dark: false,
  title: "Question Workflow (grouped)",
  workflow: mockWorkflow
}
Tablet.parameters = {
  viewport: {
    defaultViewport: 'ipad'
  }
}

