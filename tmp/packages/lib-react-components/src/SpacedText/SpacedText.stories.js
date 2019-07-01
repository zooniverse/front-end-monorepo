import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import React from 'react'

import readme from './README.md'
import SpacedText from './SpacedText'

const config = {
  notes: {
    markdown: readme
  }
}

storiesOf('SpacedText', module)
  .addDecorator(withKnobs)

  .add('default', () => (
    <Grommet theme={zooTheme}>
      <SpacedText>
        {text('Text', 'Zooniverse spaced text')}
      </SpacedText>
    </Grommet>
  ), config)

  .add('bold', () => (
    <Grommet theme={zooTheme}>
      <SpacedText weight='bold'>
        {text('Text', 'Zooniverse spaced text')}
      </SpacedText>
    </Grommet>
  ), config)
