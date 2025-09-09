import { Box } from 'grommet'

import ZoomHelperOverlay from './ZoomHelperOverlay'

const subjectImage = 'https://panoptes-uploads.zooniverse.org/production/subject_location/11f98201-1c3f-44d5-965b-e00373daeb18.jpeg'
const landscapeImage = 'https://panoptes-uploads-staging.zooniverse.org/subject_location/40ea5570-bb8d-414b-aa9a-8ea14e7d696c.jpeg'
const portraitImage = 'https://panoptes-uploads-staging.zooniverse.org/subject_location/6e3291e7-2925-4aba-9a1b-b57de26952df.jpeg'

export default {
  title: 'Subject Viewers / SingleImageViewer / ZoomHelperOverlay',
  component: ZoomHelperOverlay
}

export function Default() {
  return (
    <Box
      overflow='hidden'
      width='100%'
      position='relative'
    >
      <ZoomHelperOverlay />
      <img src={subjectImage} alt='Subject' tabIndex={0} />
    </Box>
  )
}

export function LandscapeImage() {
  return (
    <Box
      overflow='hidden'
      width='100%'
      position='relative'
    >
      <ZoomHelperOverlay />
      <img src={landscapeImage} alt='Subject' tabIndex={0} />
    </Box>
  )
}

export function PortraitImage() {
  return (
    <Box
      overflow='hidden'
      width='100%'
      position='relative'
    >
      <ZoomHelperOverlay />
      <img src={portraitImage} alt='Subject' tabIndex={0} />
    </Box>
  )
}
