import React from 'react'
import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import { storiesOf } from '@storybook/react'
import { linkTo } from '@storybook/addon-links'
import { withInfo } from '@storybook/addon-info'
import { backgrounds } from './lib'
import { AdminCheckbox, ZooFooter } from '../src'
import footerDocs from '../src/ZooFooter/README.md'

storiesOf('ZooFooter', module)
  .addDecorator(backgrounds)
  .add('Light theme (default)', withInfo(footerDocs)(() =>
    <Grommet theme={zooTheme}>
      <ZooFooter />
    </Grommet>
  ))
  .add('Dark theme', () => (
    <Grommet theme={zooTheme}>
      <ZooFooter colorTheme='dark' />
    </Grommet>
  ))
  .add('Light with admin', () => (
    <Grommet theme={zooTheme}>
      <ZooFooter adminContainer={<AdminCheckbox onChange={linkTo('ZooFooter/AdminCheckbox')} />} />
    </Grommet>
  ))
  .add('Dark with admin', () => (
    <Grommet theme={zooTheme}>
      <ZooFooter adminContainer={<AdminCheckbox onChange={linkTo('ZooFooter/AdminCheckbox')} colorTheme='dark' />} colorTheme='dark' />
    </Grommet>
  ))
