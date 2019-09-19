import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import React from 'react'

import { RecentSubjectsContainer } from './RecentSubjectsContainer'

const RECENTS = [
  {
    favorite: false,
    subjectId: '123',
    locations: [
      {'image/jpeg': 'https://panoptes-uploads.zooniverse.org/335/0/2d63944e-f0bc-4fc5-8531-f603886513a1.jpeg'}
    ]
  },
  {
    favorite: true,
    subjectId: '456',
    locations: [
      {'image/jpeg': 'https://panoptes-uploads.zooniverse.org/335/0/a2379744-c225-4421-b340-1c5361e29300.jpeg'}
    ]
  },
  {
    favorite: false,
    subjectId: '789',
    locations: [
      {'image/jpeg': 'https://panoptes-uploads.zooniverse.org/335/0/ed7f9f7f-551f-413c-9107-973544525399.jpeg'}
    ]
  }
]

function toggle() {
  this.favorite = !this.favorite
}
RECENTS.forEach(recent => recent.toggleFavorite = toggle.bind(recent) )

storiesOf('Project App / Screens / Classify / Recent Subjects', module)
  .add('plain', () => (
    <Grommet theme={zooTheme}>
      <RecentSubjectsContainer
        recents={RECENTS}
        projectName="Snapshot Serengeti"
      />
    </Grommet>
  ))