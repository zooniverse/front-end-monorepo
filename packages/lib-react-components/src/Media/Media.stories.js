import { withKnobs, text } from '@storybook/addon-knobs';
import zooTheme from '@zooniverse/grommet-theme';
import { Grommet, Box } from 'grommet';

import Media from './Media';
import readme from './README.md';
import ZooniverseLogo from '../ZooniverseLogo';

const config = {
  docs: {
    description: {
      component: readme,
    },
  },
};

const AUDIO_URL =
  'https://panoptes-uploads.zooniverse.org/production/subject_location/1c93591f-5d7e-4129-a6da-a65419b88048.mpga';
const IMAGE_URL =
  'https://panoptes-uploads.zooniverse.org/production/subject_location/66094a64-8823-4314-8ef4-1ee228e49470.jpeg';
const VIDEO_URL = 'https://static.zooniverse.org/www.zooniverse.org/assets/home-video.mp4';

export default {
  title: 'Components/Media',
  decorators: [withKnobs],
};

export const Image = () => (
  <Grommet theme={zooTheme}>
    <Box>
      <Media
        alt={text('Alt', 'A galaxy')}
        height={200}
        src={text('Image URL', IMAGE_URL)}
        width={270}
      />
    </Box>
  </Grommet>
);

Image.story = {
  parameters: config,
};

export const ImageWithAPlaceholderWhileLoading = () => (
  <Grommet theme={zooTheme}>
    <Box margin={{ bottom: 'medium' }}>
      Image with zooniverse logo placeholder and an added loading delay of 3 seconds so you can see
      it...
    </Box>
    <Box>
      <Media
        alt="A galaxy"
        delay={3000}
        height={250}
        placeholder={<ZooniverseLogo size="38%" />}
        src={text('Image URL', IMAGE_URL)}
        width={250}
      />
    </Box>
  </Grommet>
);

ImageWithAPlaceholderWhileLoading.story = {
  name: 'Image with a placeholder while loading',
  parameters: config,
};

export const Video = () => (
  <Grommet theme={zooTheme}>
    <Box>
      <Media
        alt={text('Alt', 'Zooniverse in a nutshell')}
        height={200}
        src={text('Video URL', VIDEO_URL)}
        width={270}
      />
    </Box>
  </Grommet>
);

Video.story = {
  parameters: config,
};

export const Audio = () => (
  <Grommet theme={zooTheme}>
    <Box>
      <Media
        alt={text('Alt', 'City noise')}
        height={200}
        src={text('Audio URL', AUDIO_URL)}
        width={270}
      />
    </Box>
  </Grommet>
);

Audio.story = {
  parameters: config,
};
