import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import counterpart from 'counterpart'
import { Grommet } from 'grommet'
import React from 'react'
import en from './locales/en'

import RecentSubjects from './RecentSubjects'

counterpart.registerTranslations('en', en)

const SUBJECTS = [
  {
    favorite: false,
    id: '123',
    locations: [
      { 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/335/0/2d63944e-f0bc-4fc5-8531-f603886513a1.jpeg' }
    ]
  },
  {
    favorite: true,
    id: '456',
    locations: [
      { 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/335/0/a2379744-c225-4421-b340-1c5361e29300.jpeg' }
    ]
  },
  {
    favorite: false,
    id: '789',
    locations: [
      { 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/335/0/ed7f9f7f-551f-413c-9107-973544525399.jpeg' }
    ]
  }
]

const PORTRAIT_SUBJECTS = [
  {
    favorite: false,
    id: '123',
    locations: [
      { 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/production/subject_location/fb2c57e2-96f7-49b1-9bd4-9bdc73d847f8.jpeg' }
    ]
  },
  {
    favorite: true,
    id: '456',
    locations: [
      { 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/production/subject_location/7be26d91-9dcf-4a50-a443-51ea9c630c0d.jpeg' }
    ]
  },
  {
    favorite: false,
    id: '789',
    locations: [
      { 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/production/subject_location/8b7deee1-af99-4400-a235-2bbd21ed4c39.jpeg' }
    ]
  }
]

const VIDEO_SUBJECTS = [
  {
    favorite: false,
    id: '123',
    locations: [
      { 'video/mp4': 'https://panoptes-uploads.zooniverse.org/production/subject_location/279b23de-b1e8-4a1c-90c4-2d25bbee787d.mp4' }
    ]
  },
  {
    favorite: true,
    id: '456',
    locations: [
      { 'video/mp4': 'https://panoptes-uploads.zooniverse.org/production/subject_location/64e2df1e-830d-4126-a1bc-8f0eef6e9eb9.mp4' }
    ]
  },
  {
    favorite: false,
    id: '789',
    locations: [
      { 'video/mp4': 'https://panoptes-uploads.zooniverse.org/production/subject_location/d3e90135-efda-4391-b7bf-cbed262c9dc8.mp4' }
    ]
  }
]
storiesOf('Project App / Screens / Project Home / Recent Subjects', module)
  .add('plain', () => (
    <Grommet theme={zooTheme}>
      <RecentSubjects
        href='/projects/zooniverse/snapshot-serengeti/talk'
        subjects={SUBJECTS}
      />
    </Grommet>
  ))
  .add('transcription', () => (
    <Grommet theme={zooTheme}>
      <RecentSubjects
        href='/projects/zooniverse/snapshot-serengeti/talk'
        subjects={PORTRAIT_SUBJECTS}
      />
    </Grommet>
  ))
  .add('video', () => (
    <Grommet theme={zooTheme}>
      <RecentSubjects
        href='/projects/zooniverse/snapshot-serengeti/talk'
        subjects={VIDEO_SUBJECTS}
      />
    </Grommet>
  ))
