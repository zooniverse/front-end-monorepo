import React from 'react'
import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react'
import { withInfo } from '@storybook/addon-info'

import { backgrounds } from './lib'
import { AdminCheckbox } from '../src'
import adminDocs from '../src/ZooFooter/components/AdminCheckbox/README.md'

const stories = storiesOf('ZooFooter/AdminCheckbox', module)

stories.addDecorator(withKnobs)

stories.addDecorator(backgrounds)

stories.add('Light theme (default)', withInfo(adminDocs)(() => (
  <Grommet theme={zooTheme}>
    <AdminCheckbox checked={boolean('checked', false)} onChange={action('admin toggle change')} />
  </Grommet>
)))

stories.add('Dark theme', withInfo(adminDocs)(() => (
  <Grommet theme={zooTheme}>
    <AdminCheckbox
      checked={boolean('checked', false)}
      colorTheme='dark'
      onChange={action('admin toggle change')}
    />
  </Grommet>
)))
