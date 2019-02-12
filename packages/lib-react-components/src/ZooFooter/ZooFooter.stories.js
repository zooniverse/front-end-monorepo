import { linkTo } from '@storybook/addon-links'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
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
    <Grommet theme={zooTheme}>
      <ZooFooter />
    </Grommet>
  ), config)

  .add('Dark theme', () => (
    <Grommet theme={zooTheme}>
      <ZooFooter colorTheme='dark' />
    </Grommet>
  ), config)

  .add('Light with admin', () => (
    <Grommet theme={zooTheme}>
      <ZooFooter
        adminContainer={(
          <AdminCheckbox onChange={linkTo('ZooFooter/AdminCheckbox')} />
        )}
      />
    </Grommet>
  ), config)

  .add('Dark with admin', () => (
    <Grommet theme={zooTheme}>
      <ZooFooter
        adminContainer={(
          <AdminCheckbox
            onChange={linkTo('ZooFooter/AdminCheckbox')}
            colorTheme='dark'
          />
        )}
        colorTheme='dark'
      />
    </Grommet>
  ), config)
