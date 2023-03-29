import zooTheme from '@zooniverse/grommet-theme'
import { Grommet, Box, Text } from 'grommet'

import Media from './Media'
import ZooniverseLogo from '../ZooniverseLogo'
import readme from './README.md'

const config = {
  docs: {
    description: {
      component: readme
    }
  }
}

export default {
  title: 'Components / Media',
  component: Media,
  args: {
    dark: false
  },
  parameters: config
}

const AUDIO_URL =
  'https://panoptes-uploads.zooniverse.org/production/subject_location/1c93591f-5d7e-4129-a6da-a65419b88048.mpga'
const DATA_URL =
  'https://panoptes-uploads.zooniverse.org/subject_location/74fddc9b-790d-47c6-9eac-110c64022ea8.json'
const IMAGE_URL =
  'https://panoptes-uploads.zooniverse.org/production/subject_location/66094a64-8823-4314-8ef4-1ee228e49470.jpeg'
const VIDEO_URL =
  'https://static.zooniverse.org/www.zooniverse.org/assets/home-video.mp4'

export function Image({ dark }) {
  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode={dark ? 'dark' : 'light'}
    >
      <Box>
        <Text>Width set as 270</Text>
        <Media alt='A galaxy' src={IMAGE_URL} width={270} />
      </Box>
      <Box>
        <Text>Has a placeholder (delay 3sec). Width and height set as 200</Text>
        <Media
          alt='A galaxy'
          delay={3000}
          height={200}
          placeholder={<ZooniverseLogo id='Media storybook' size='38%' />}
          src={IMAGE_URL}
          width={200}
        />
      </Box>
      <Box>
        <Text>Specifying only a height will crop the image</Text>
        <Media alt='A galaxy' src={IMAGE_URL} height={100} />
      </Box>
      <Box>
        <Text>Not setting the dimensions props defaults them to 999px</Text>
        <Media alt='A galaxy' src={IMAGE_URL} />
      </Box>
    </Grommet>
  )
}

export function Video({ dark }) {
  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode={dark ? 'dark' : 'light'}
    >
      <Box>
        <Text>Width set as 270</Text>
        <Media alt='Zooniverse in a nutshell' src={VIDEO_URL} width={270} />
      </Box>
    </Grommet>
  )
}

export function Audio({ dark }) {
  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode={dark ? 'dark' : 'light'}
    >
      <Box>
        <Media alt='City noise' src={AUDIO_URL} width={270} />
      </Box>
    </Grommet>
  )
}

export function Data({ dark }) {
  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode={dark ? 'dark' : 'light'}
    >
      <Box>
        <Media
          alt='SuperWASP Black Hole Hunters'
          src={DATA_URL}
          height={250}
          width={270}
        />
      </Box>
    </Grommet>
  )
}
