import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import React from 'react'
import { backgrounds } from '../../../../.storybook/lib'

import SubjectPreview from './'

const darkThemeConfig = { backgrounds: backgrounds.darkDefault }

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

storiesOf('Project App / Shared / Subject Preview', module)
  .addDecorator(withKnobs)
  .add('plain', () => (
    <Grommet theme={{ ...zooTheme, dark: boolean('Dark theme', false) }}>
      <Box background={{ dark: 'dark-3', light: 'light-3' }} height='medium' pad='medium' width='medium'>
        <SubjectPreview
          height={'200px'}
          isLoggedIn={boolean('User logged in', true)}
          subject={CAT}
          slug='zooniverse/snapshot-serengeti'
          width={'270px'}
        />
      </Box>
    </Grommet>
  ))

  .add('dark theme', () => (
    <Grommet theme={{ ...zooTheme, dark: boolean('Dark theme', true) }}>
      <Box background={{ dark: 'dark-3', light: 'light-3' }} height='medium' pad='medium' width='medium'>
        <SubjectPreview
          height={'200px'}
          isLoggedIn={boolean('User logged in', true)}
          subject={CAT}
          slug='zooniverse/snapshot-serengeti'
          width={'270px'}
        />
      </Box>
    </Grommet>
  ), darkThemeConfig)

  .add('transcription', () => (
    <Grommet theme={{ ...zooTheme, dark: boolean('Dark theme', false) }}>
      <Box background={{ dark: 'dark-3', light: 'light-3' }} height='medium' pad='medium' width='medium'>
        <SubjectPreview
          height={'200px'}
          isLoggedIn={boolean('User logged in', true)}
          subject={PORTRAIT_PAGE}
          slug='zooniverse/snapshot-serengeti'
          width={'270px'}
        />
      </Box>
    </Grommet>
  ))
  .add('video', () => (
    <Grommet theme={{ ...zooTheme, dark: boolean('Dark theme', false) }}>
      <Box background={{ dark: 'dark-3', light: 'light-3' }} height='medium' pad='medium' width='medium'>
        <SubjectPreview
          height={'200px'}
          isLoggedIn={boolean('User logged in', true)}
          subject={VIDEO}
          slug='zooniverse/snapshot-serengeti'
          width={'270px'}
        />
      </Box>
    </Grommet>
  ))
