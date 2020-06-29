import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs'
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import React from 'react'

import readme from './README.md'
import SpacedHeading from './SpacedHeading'

const config = {
  notes: {
    markdown: readme
  }
}

storiesOf('SpacedHeading', module)
  .addDecorator(withKnobs)

  .add('default', () => (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode='light'
    >
      <Box pad='medium'>
        <SpacedHeading
          color={text('Color', undefined)}
          level={select('Level', [1, 2, 3, 4, 5, 6], 2)}
          size={select('Size', ['small', 'medium', 'large', 'xlarge'], 'medium')}
          weight={select('Weight', ['normal', 'bold'], 'bold')}
        >
          {text('Text', 'Zooniverse spaced text heading')}
        </SpacedHeading>
      </Box>
    </Grommet>
  ), config)
  .add('dark theme', () => (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={Object.assign({}, zooTheme, { dark: true })}
      themeMode='dark'
    >
      <Box pad='medium'>
        <SpacedHeading
          color={text('Color', undefined)}
          level={select('Level', [1, 2, 3, 4, 5, 6], 2)}
          size={select('Size', ['small', 'medium', 'large', 'xlarge'], 'medium')}
          weight={select('Weight', ['normal', 'bold'], 'bold')}
        >
          {text('Text', 'Zooniverse spaced text heading')}
        </SpacedHeading>
      </Box>
    </Grommet>
  ))

