import { withActions } from '@storybook/addon-actions'
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Button, Grommet } from 'grommet'
import React from 'react'

// import readme from './README.md'
import Triangle from './Triangle'

const config = {
  // notes: {
  //   markdown: readme
  // }
}

const pointDirections = ['up', 'down', 'left', 'right']

storiesOf('Triangle', module)
  .addDecorator(withKnobs)
  .addDecorator(withActions('click button'))
  .add('default', () => (
    <TriangleStoryExample
      dark={boolean('Dark theme', false)}
      height='500px'
      pointDirection={select('Point Direction', pointDirections)}
    />
  ), config)

function TriangleStoryExample(props) {
  const { dark, pointDirection } = props
  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={Object.assign({}, zooTheme, { dark })}
      themeMode={(dark) ? 'dark' : 'light'}
    >
      <Box align='center' height='medium' justify='center' pad='medium'>
        <Triangle pointDirection={pointDirection} />
      </Box>
    </Grommet>
  )
}
