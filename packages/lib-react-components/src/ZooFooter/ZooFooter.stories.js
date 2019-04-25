import { linkTo } from '@storybook/addon-links'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import { merge } from 'lodash'
import React from 'react'

import ZooFooter from './ZooFooter'
import readme from './README.md'
import AdminCheckbox from '../AdminCheckbox'

const config = {
  notes: {
    markdown: readme
  }
}

storiesOf('ZooFooter', module)

  .add('Light theme (default)', () => (
    <Grommet theme={mergeThemes({ dark: false })}>
      <ZooFooter />
    </Grommet>
  ), config)

  .add('Dark theme', () => (
    <Grommet theme={mergeThemes({ dark: true })}>
      <ZooFooter />
    </Grommet>
  ), config)

  .add('Light with admin', () => (
    <Grommet theme={mergeThemes({ dark: false })}>
      <ZooFooter
        adminContainer={(
          <AdminCheckbox onChange={linkTo('ZooFooter/AdminCheckbox')} />
        )}
      />
    </Grommet>
  ), config)

  .add('Dark with admin', () => (
    <Grommet theme={mergeThemes({ dark: true })}>
      <ZooFooter
        adminContainer={(
          <AdminCheckbox
            onChange={linkTo('ZooFooter/AdminCheckbox')}
          />
        )}
      />
    </Grommet>
  ), config)

function mergeThemes (customTheme) {
  return merge({}, zooTheme, customTheme)
}
