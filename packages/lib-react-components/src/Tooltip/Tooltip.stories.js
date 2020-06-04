import { withActions } from '@storybook/addon-actions'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Button, Grommet } from 'grommet'
import React from 'react'

import readme from './README.md'
import Tooltip from './Tooltip'

const config = {
  notes: {
    markdown: readme
  }
}

storiesOf('Tooltip', module)
  .addDecorator(withKnobs)
  .addDecorator(withActions('click button'))
  .add('default', () => (
    <TooltipStoryExample
      dark={boolean('Dark theme', false)}
      height='500px'
      tooltipText={text('Tooltip text', 'A helpful tip')}
    />
  ), config)
  .add('rotated position when close to viewport edge', () => (
    <TooltipStoryExample
      dark={boolean('Dark theme', false)}
      tooltipText={text('Tooltip text', 'A helpful tip')}
    />
  ), config)

function TooltipStoryExample (props) {
  const { dark, height, tooltipText } = props
  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={Object.assign({}, zooTheme, { dark })}
      themeMode={(dark) ? 'dark' : 'light'}
    >
      <Box align='center' height={height} justify='center' pad='medium'>
        <Tooltip
          label={tooltipText}
        >
          <Button label='Focus me' onClick={() => {}} />
        </Tooltip>
      </Box>
    </Grommet>
  )
}
