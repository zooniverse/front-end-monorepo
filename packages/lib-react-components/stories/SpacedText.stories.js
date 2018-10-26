import React from 'react'
import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react'
import { withInfo } from '@storybook/addon-info'

import { backgrounds } from './lib'
import { SpacedText } from '../src'
import spacedTextDocs from '../src/SpacedText/README.md'

storiesOf('SpacedText', module)
  .addDecorator(backgrounds)
  .add('Light theme (default)', withInfo(spacedTextDocs)(() =>
    <Grommet theme={zooTheme}>
      <SpacedText>Zooniverse</SpacedText>
    </Grommet>
  ))
