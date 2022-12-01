import { withKnobs, boolean } from '@storybook/addon-knobs';
import zooTheme from '@zooniverse/grommet-theme';
import { Grommet } from 'grommet';
import readme from './README.md';

import FavouritesButton from './';

const config = {
  docs: {
    description: {
      component: readme,
    },
  },
};

const CAT = {
  favorite: false,
  id: '123',
  locations: [
    {
      'image/jpeg':
        'https://panoptes-uploads.zooniverse.org/335/0/2d63944e-f0bc-4fc5-8531-f603886513a1.jpeg',
    },
  ],
};

export default {
  title: 'Components/Favourites Button',
  decorators: [withKnobs],
};

export const Plain = () => (
  <Grommet theme={{ ...zooTheme, dark: boolean('Dark theme', false) }}>
    <FavouritesButton disabled={boolean('disabled', false)} subject={CAT} />
  </Grommet>
);

Plain.story = {
  name: 'plain',
  parameters: config,
};

export const InitiallyChecked = () => (
  <Grommet theme={{ ...zooTheme, dark: boolean('Dark theme', false) }}>
    <FavouritesButton checked disabled={boolean('disabled', false)} subject={CAT} />
  </Grommet>
);

InitiallyChecked.story = {
  name: 'initially checked',
  parameters: config,
};
