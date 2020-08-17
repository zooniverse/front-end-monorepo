import { linkTo } from '@storybook/addon-links'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
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
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={mergeThemes({ dark: false })}
      themeMode='light'
    >
      <Box fill>
        <ZooFooter />
      </Box>
    </Grommet>
  ), config)

  .add('Dark theme', () => (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={mergeThemes({ dark: true })}
      themeMode='dark'
    >
      <Box fill>
        <ZooFooter />
      </Box>
    </Grommet>
  ), config)

  .add('Light with admin', () => (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={mergeThemes({ dark: false })}
      themeMode='light'
    >
      <Box fill>
        <ZooFooter
          adminContainer={(
            <AdminCheckbox onChange={linkTo('ZooFooter/AdminCheckbox')} />
          )}
        />
      </Box>
    </Grommet>
  ), config)

  .add('Dark with admin', () => (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={mergeThemes({ dark: true })}
      themeMode='dark'
    >
      <Box fill>
        <ZooFooter
          adminContainer={(
            <AdminCheckbox
              onChange={linkTo('ZooFooter/AdminCheckbox')}
            />
          )}
        />
      </Box>
    </Grommet>
  ), config)

function mergeThemes (customTheme) {
  return merge({}, zooTheme, customTheme)
}
