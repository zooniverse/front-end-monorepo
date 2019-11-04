import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import React from 'react'

import readme from './README.md'
import PrimaryButton from './PrimaryButton'

const config = {
  notes: {
    markdown: readme
  }
}

storiesOf('PrimaryButton', module)

  .add('default', () => (
    <Grommet theme={zooTheme}>
      <PrimaryButton />
    </Grommet>
  ), config)
