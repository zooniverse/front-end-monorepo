import { withActions } from '@storybook/addon-actions'
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Button, Grommet } from 'grommet'
import React from 'react'

// import readme from './README.md'
import Label from './Label'

const config = {
  // notes: {
  //   markdown: readme
  // }
}

storiesOf('Tooltip/Label', module)
  .addDecorator(withKnobs)
  .addDecorator(withActions('click button'))
  .add('default', () => (
    <LabelStoryExample
      arrow={boolean('Arrow', true)}
      dark={boolean('Dark theme', false)}
      label={text('Label text', 'Hello')}
    />
  ), config)

function LabelStoryExample(props) {
  const { arrow, dark, label } = props
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
        <Label arrow={arrow} label={label} />
      </Box>
    </Grommet>
  )
}
