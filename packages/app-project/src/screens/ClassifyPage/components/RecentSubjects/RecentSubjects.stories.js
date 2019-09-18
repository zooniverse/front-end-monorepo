import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import React from 'react'

import { RecentSubjectsContainer } from './RecentSubjectsContainer'
const RECENTS = [
  1,
  2,
  3
]

storiesOf('Project App / Screens / Classify / Recent Subjects', module)
  .add('plain', () => (
    <Grommet theme={zooTheme}>
      <RecentSubjectsContainer
        recents={RECENTS}
        projectName="Snapshot Serengeti"
      />
    </Grommet>
  ))