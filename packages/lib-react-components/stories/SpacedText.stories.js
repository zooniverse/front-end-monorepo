import React from 'react'
import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'

import { storiesOf } from '@storybook/react'

import { SpacedText } from '../src'
import spacedTextDocs from '../src/SpacedText/README.md'

storiesOf('SpacedText', module)
  .addParameters({
    info: spacedTextDocs
  })
  .add('Light theme (default)', () =>
    <Grommet theme={zooTheme}>
      <SpacedText>Zooniverse</SpacedText>
    </Grommet>
  )
