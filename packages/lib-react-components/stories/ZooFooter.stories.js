import React from 'react'
import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import { storiesOf } from '@storybook/react'
import { linkTo } from '@storybook/addon-links'
import { backgrounds } from './lib'
import { AdminCheckbox, ZooFooter } from '../src'
import footerDocs from '../src/ZooFooter/README.md'

storiesOf('ZooFooter', module)
  .addParameters({
    backgrounds,
    info: footerDocs
  })
  .add('Light theme (default)', () => (
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
