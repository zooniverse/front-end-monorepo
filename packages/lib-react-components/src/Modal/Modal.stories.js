import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import React from 'react'

import Modal from './Modal'
import readme from './README.md'

const EXAMPLE_STRING = 'Leo mollis dictum id dis maecenas consectetur metus elementum vivamus nisl, suscipit tristique lectus nulla mus etiam nisi facilisis magnis, scelerisque ligula montes luctus cursus nibh vulputate parturient risus.'

const darkZooTheme = { ...zooTheme, dark: true }

export default {
  title: 'Modal',
  component: Modal,
  args: {
    active: true,
    content: EXAMPLE_STRING,
    title: 'Modal Title'
  },
  argTypes: {
    closeFn: {
      action: 'Close modal'
    }
  },
  parameters: {
    docs: {
      description: {
        component: readme
      },
      inlineStories: false
    }
  }
}

export function LightTheme({ active, closeFn, content, title }) {
  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode='light'
    >
      <Modal
        active={active}
        closeFn={closeFn}
        title={title}
      >
        {content}
      </Modal>
    </Grommet>
  )
}

export function DarkTheme({ active, closeFn, content, title }) {
  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode='dark'
    >
      <Modal
        active={active}
        closeFn={closeFn}
        title={title}
      >
        {content}
      </Modal>
    </Grommet>
  )
}

export function Required({ content, title }) {
  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode='light'
    >
      <Modal
        active
        title={title}
      >
        {content}
      </Modal>
    </Grommet>
  )
}
