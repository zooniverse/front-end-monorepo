import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import React from 'react'

import SubjectPreview from './'

const CAT = {
  favorite: false,
  id: '123',
  locations: [
    { 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/335/0/2d63944e-f0bc-4fc5-8531-f603886513a1.jpeg' }
  ]
}

const PORTRAIT_PAGE = {
  favorite: false,
  id: '123',
  locations: [
    { 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/production/subject_location/fb2c57e2-96f7-49b1-9bd4-9bdc73d847f8.jpeg' }
  ]
}

const VIDEO = {
  favorite: false,
  id: '123',
  locations: [
    { 'video/mp4': 'https://panoptes-uploads.zooniverse.org/production/subject_location/279b23de-b1e8-4a1c-90c4-2d25bbee787d.mp4' }
  ]
}

function toggle () {
  this.favorite = !this.favorite
}

[
  CAT,
  PORTRAIT_PAGE,
  VIDEO
].forEach(subject => {
  subject.toggleFavourite = toggle.bind(subject)
})

storiesOf('Project App / Screens / Classify / Subject Preview', module)
  .add('plain', () => (
    <Grommet theme={zooTheme}>
      <SubjectPreview
        height={200}
        isLoggedIn={true}
        subject={CAT}
        slug='zooniverse/snapshot-serengeti'
        width={270}
      />
    </Grommet>
  ))
  .add('transcription', () => (
    <Grommet theme={zooTheme}>
      <SubjectPreview
        height={200}
        isLoggedIn={true}
        subject={PORTRAIT_PAGE}
        slug='zooniverse/snapshot-serengeti'
        width={270}
      />
    </Grommet>
  ))
  .add('video', () => (
    <Grommet theme={zooTheme}>
      <SubjectPreview
        height={200}
        isLoggedIn={true}
        subject={VIDEO}
        slug='zooniverse/snapshot-serengeti'
        width={270}
      />
    </Grommet>
  ))
