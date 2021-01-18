import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import React, { useState } from 'react'

import Modal from './Modal'
import readme from './README.md'

const EXAMPLE_STRING = 'Leo mollis dictum id dis maecenas consectetur metus elementum vivamus nisl, suscipit tristique lectus nulla mus etiam nisi facilisis magnis, scelerisque ligula montes luctus cursus nibh vulputate parturient risus.'

const config = {
  docs: {
    description: {
      component: readme
    }
  }
}

const darkZooTheme = { ...zooTheme, dark: true }

export default {
  title: 'Modal',
  component: Modal,
  args: {
    content: EXAMPLE_STRING,
    title: 'Modal Title'
  }
}

export function LightTheme({ content, title }) {
  const [ active, setActive ] = useState(true)

  function closeFn() {
    setActive(false)
  }

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

export function DarkTheme({ content, title }) {
  const [ active, setActive ] = useState(true)

  function closeFn() {
    setActive(false)
  }

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
