import React from 'react'
import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs'

import { backgrounds } from './lib'
import { AdminCheckbox } from '../src'
import adminDocs from '../src/ZooFooter/components/AdminCheckbox/README.md'

storiesOf('ZooFooter/AdminCheckbox', module)
  .addDecorator(withKnobs)
  .addDecorator(backgrounds)
  .addParameters({
    info: adminDocs
  })
  .add('Light theme (default)', () => (
    <Grommet theme={zooTheme}>
      <AdminCheckbox checked={boolean('checked', false)} onChange={action('admin toggle change')} />
    </Grommet>
  ))
  .add('Dark theme', () => (
    <Grommet theme={zooTheme}>
      <AdminCheckbox
        checked={boolean('checked', false)}
        colorTheme='dark'
        onChange={action('admin toggle change')}
      />
    </Grommet>
  ))
