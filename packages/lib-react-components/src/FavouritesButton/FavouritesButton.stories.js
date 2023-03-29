import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'

import FavouritesButton from './'

const CAT = {
  favorite: false,
  id: '123',
  locations: [
    {
      'image/jpeg':
        'https://panoptes-uploads.zooniverse.org/335/0/2d63944e-f0bc-4fc5-8531-f603886513a1.jpeg'
    }
  ]
}

export default {
  title: 'Components/Favourites Button',
  component: FavouritesButton,
  args: {
    dark: false
  }
}

export const Default = ({ dark }) => (
  <Grommet
    background={{
      dark: 'dark-1',
      light: 'light-1'
    }}
    theme={zooTheme}
    themeMode={dark ? 'dark' : 'light'}
  >
    <FavouritesButton disabled={false} subject={CAT} />
  </Grommet>
)

export const Checked = ({ dark }) => (
  <Grommet
    background={{
      dark: 'dark-1',
      light: 'light-1'
    }}
    theme={zooTheme}
    themeMode={dark ? 'dark' : 'light'}
  >
    <FavouritesButton checked disabled={false} subject={CAT} />
  </Grommet>
)

export const Disabled = ({ dark }) => (
  <Grommet
    background={{
      dark: 'dark-1',
      light: 'light-1'
    }}
    theme={zooTheme}
    themeMode={dark ? 'dark' : 'light'}
  >
    <FavouritesButton checked={false} disabled subject={CAT} />
  </Grommet>
)
