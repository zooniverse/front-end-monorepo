import { Box, Text } from 'grommet'

import Media from './Media'
import ZooniverseLogo from '../ZooniverseLogo'

/** This will not work with @storybook/react composeStory function */
// import readme from './README.md'

export default {
  title: 'Components / Media',
  component: Media
  // parameters: {
  //   docs: {
  //     description: {
  //       component: readme
  //     }
  //   }
  // }
}

const AUDIO_URL =
  'https://panoptes-uploads.zooniverse.org/production/subject_location/1c93591f-5d7e-4129-a6da-a65419b88048.mpga'
const DATA_URL =
  'https://panoptes-uploads.zooniverse.org/subject_location/74fddc9b-790d-47c6-9eac-110c64022ea8.json'
const IMAGE_URL =
  'https://panoptes-uploads.zooniverse.org/production/subject_location/66094a64-8823-4314-8ef4-1ee228e49470.jpeg'
const VIDEO_URL =
  'https://static.zooniverse.org/fem-assets/home-video.mp4'
const TEXT_URL =
  'https://panoptes-uploads.zooniverse.org/subject_location/f5506d1c-a0e9-4aba-a418-6a6c46a7731a.txt'
const VOLUMETRIC_URL = 
  'https://panoptes-uploads-staging.zooniverse.org/subject_location/3c56e6a7-be27-4ab3-93a7-c41a3c867baf.json'

export function Image() {
  return (
    <>
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
        <Text>Without dimensions, the component should fall back to the original image.</Text>
        <Media alt='A galaxy' src={IMAGE_URL} />
      </Box>
    </>
  )
}

export function Video() {
  return (
    <Box>
      <Text>Width set as 270</Text>
      <Media alt='Zooniverse in a nutshell' src={VIDEO_URL} width={270} />
    </Box>
  )
}

export function Audio() {
  return (
    <Box>
      <Media alt='City noise' src={AUDIO_URL} width={270} />
    </Box>
  )
}

export function Data() {
  return (
    <Box>
      <Media
        alt='SuperWASP Black Hole Hunters'
        src={DATA_URL}
        height={250}
        width={270}
      />
    </Box>
  )
}

export function TextMedia() {
  return (
    <Box>
      <Text>Width set as 270</Text>
      <Media
        alt='A text file'
        src={TEXT_URL}
        width={270}
      />
    </Box>
  )
}

export function VolumetricMedia() {
  return (
    <Box>
      <Text>Width set as 270</Text>
      <Media
        alt='A volumetric file'
        src={VOLUMETRIC_URL}
        width={270}
      />
    </Box>
  )
}
