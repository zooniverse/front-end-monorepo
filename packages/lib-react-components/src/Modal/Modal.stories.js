import { withKnobs, text, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import React from 'react'

import Modal from './Modal'
import readme from './README.md'

const EXAMPLE_STRING = 'Leo mollis dictum id dis maecenas consectetur metus elementum vivamus nisl, suscipit tristique lectus nulla mus etiam nisi facilisis magnis, scelerisque ligula montes luctus cursus nibh vulputate parturient risus.'

const config = {
  notes: {
    markdown: readme
  }
}

const darkZooTheme = { ...zooTheme, dark: true }

storiesOf('Modal', module)
  .addDecorator(withKnobs)

  .add('Light theme (default)', () => (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode='light'
    >
      <Modal
        active={boolean('Active', true)}
        closeFn={action('Close modal')}
        title={text('Title', 'Modal Title')}
      >
        {text('Content', EXAMPLE_STRING)}
      </Modal>
    </Grommet>
  ), config)

  .add('Dark theme', () => (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={darkZooTheme}
      themeMode='dark'
    >
      <Modal
        active={boolean('Active', true)}
        closeFn={action('Close modal')}
        title={text('Title', 'Modal Title')}
      >
        {text('Content', EXAMPLE_STRING)}
      </Modal>
    </Grommet>
  ), config)
