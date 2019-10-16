import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import React from 'react'
import readme from './README.md'

import FavouritesButton from './'

const config = {
  notes: {
    markdown: readme
  }
}

const CAT = {
  favorite: false,
  id: '123',
  locations: [
    { 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/335/0/2d63944e-f0bc-4fc5-8531-f603886513a1.jpeg' }
  ]
}

storiesOf('Favourites Button', module)
  .addDecorator(withKnobs)
  .add('plain', () => (
    <Grommet theme={{ ...zooTheme, dark: boolean('Dark theme', false) }}>
      <FavouritesButton
        disabled={boolean('disabled', false)}
        subject={CAT}
      />
    </Grommet>
  ), config)
  .add('initially checked', () => (
    <Grommet theme={{ ...zooTheme, dark: boolean('Dark theme', false) }}>
      <FavouritesButton
        checked
        disabled={boolean('disabled', false)}
        subject={CAT}
      />
    </Grommet>
  ), config)
