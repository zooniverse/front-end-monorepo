import React from 'react'

import { storiesOf } from '@storybook/react'
import { linkTo } from '@storybook/addon-links'
import { withInfo } from '@storybook/addon-info'
import { backgrounds } from './lib'
import { AdminCheckbox, ZooFooter } from '../src'
import footerDocs from '../src/ZooFooter/README.md'

storiesOf('ZooFooter', module)
  .addDecorator(backgrounds)
  .add('Light theme (default)', withInfo(footerDocs)(() => <ZooFooter />))
  .add('Dark theme', () => (
    <ZooFooter colorTheme='dark' />
  ))
  .add('Light with admin', () => (
    <ZooFooter adminContainer={<AdminCheckbox onChange={linkTo('AdminCheckbox')} />} />
  ))
  .add('Dark with admin', () => (
    <ZooFooter adminContainer={<AdminCheckbox onChange={linkTo('AdminCheckbox')} colorTheme='dark' />} colorTheme='dark' />
  ))
