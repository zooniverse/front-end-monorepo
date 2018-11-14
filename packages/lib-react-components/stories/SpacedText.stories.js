import React from 'react'
import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'

import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'

import { SpacedText } from '../src'
import spacedTextDocs from '../src/SpacedText/README.md'

storiesOf('SpacedText', module)
  .add('Light theme (default)', withInfo(spacedTextDocs)(() =>
    <Grommet theme={zooTheme}>
      <SpacedText>Zooniverse</SpacedText>
    </Grommet>
  ))
