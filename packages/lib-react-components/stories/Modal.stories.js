import React from 'react'
import { withInfo } from '@storybook/addon-info'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs'
import { linkTo } from '@storybook/addon-links'
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
  .addDecorator(backgrounds)
  .addDecorator(withKnobs)
  .add('Light theme (default)', withInfo(modalDocs)(() => (
    <Grommet theme={zooTheme}>
      <Modal
        active={boolean('Active', true)}
        closeFn={closeFn}
        title={text('Title', 'Modal Title')}
      >
        {content}
      </Modal>
    </Grommet>
  )))
  .add('Dark theme', withInfo(modalDocs)(() => (
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
  )))
  
