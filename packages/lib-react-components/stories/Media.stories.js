import React from 'react'
import { Grommet, Box } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'

import { storiesOf } from '@storybook/react'

import { Media, ZooniverseLogo } from '../src'
// import mediaDocs from '../src/Media/README.md'

storiesOf('Media', module)
  // .addParameters({
  //   info: mediaDocs
  // })
  .add('Image', () =>
    <Grommet theme={zooTheme}>
      <Box>
        <Media alt='A galaxy' src='https://panoptes-uploads.zooniverse.org/production/subject_location/66094a64-8823-4314-8ef4-1ee228e49470.jpeg' />
      </Box>
    </Grommet>
  )
  .add('Image with a placeholder while loading', () =>
    <Grommet theme={zooTheme}>
      Image with zooniverse logo placeholder and an added loading delay of 3 seconds so you can see it...
      <Box>
        <Media
          alt='A galaxy'
          delay={3000}
          height={250}
          placeholder={<ZooniverseLogo size="38%" />}
          src='https://panoptes-uploads.zooniverse.org/production/subject_location/66094a64-8823-4314-8ef4-1ee228e49470.jpeg'
          width={250}
        />
      </Box>
    </Grommet>
  )
  .add('Video', () =>
    <Grommet theme={zooTheme}>
      <Box>
        <Media alt='Zooniverse in a nutshell' src='https://static.zooniverse.org/www.zooniverse.org/assets/home-video.mp4' />
      </Box>
    </Grommet>
  )
  .add('Audio', () =>
    <Grommet theme={zooTheme}>
      <Box>
        <Media alt='City noise' src='https://panoptes-uploads.zooniverse.org/production/subject_location/1c93591f-5d7e-4129-a6da-a65419b88048.mpga' />
      </Box>
    </Grommet>
  )

