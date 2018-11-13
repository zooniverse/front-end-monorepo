import React from 'react'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'

import { backgrounds } from './lib'
import { Modal } from '../src'
import modalDocs from '../src/Modal/README.md'

const closeFn = () => console.info('Close modal')

const content = (
  <div>
    Leo mollis dictum id dis maecenas consectetur metus elementum vivamus nisl, suscipit tristique lectus nulla mus etiam nisi facilisis magnis, scelerisque ligula montes luctus cursus nibh vulputate parturient risus.
  </div>
)

storiesOf('Modal', module)
  .addDecorator(withKnobs)
  .addParameters({
    backgrounds,
    info: modalDocs
  })
  .add('Light theme (default)', () => (
    <Grommet theme={zooTheme}>
      <Modal
        active={boolean('Active', true)}
        closeFn={closeFn}
        title={text('Title', 'Modal Title')}
      >
        {content}
      </Modal>
    </Grommet>
  ))
  .add('Dark theme', () => (
    <Grommet theme={zooTheme}>
      <Modal
        active={boolean('Active', true)}
        closeFn={closeFn}
        colorTheme='dark'
        title={text('Title', 'Modal Title')}
      >
        {content}
      </Modal>
    </Grommet>
  ))
  
