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

storiesOf('Modal', module)
  .addDecorator(withKnobs)

  .add('Light theme (default)', () => (
    <Grommet theme={zooTheme}>
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
    <Grommet theme={zooTheme}>
      <Modal
        active={boolean('Active', true)}
        closeFn={action('Close modal')}
        colorTheme='dark'
        title={text('Title', 'Modal Title')}
      >
        {text('Content', EXAMPLE_STRING)}
      </Modal>
    </Grommet>
  ), config)
