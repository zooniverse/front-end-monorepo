import { withKnobs, boolean } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
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

storiesOf('Project App / Screens / Project Home / Subject Set Picker', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <StoryContext theme={{ ...zooTheme, dark: boolean('Dark theme', false) }}>
      <SubjectSetPicker
        active
        title="Question Workflow (grouped)"
        workflow={mockWorkflow}
      />
    </StoryContext>
  ))
  .add('tablet', () => (
    <StoryContext theme={{ ...zooTheme, dark: boolean('Dark theme', false) }}>
      <SubjectSetPicker
        active
        title="Question Workflow (grouped)"
        workflow={mockWorkflow}
      />
    </StoryContext>
  ), { viewport: { defaultViewport: 'ipad' }})