import { Box } from 'grommet'

import AncillaryData from './AncillaryData'

const mockMedia = [
  {
    id: '324546',
    src: 'https://panoptes-uploads-staging.zooniverse.org/subject_location/89cdf135-3349-4149-8255-57bc7875323f.png',
    content_type: 'image/png',
    media_type: 'subject_location',
    external_link: false,
    created_at: '2025-07-17T20:54:36.167Z',
    metadata: {
      index: 0
    },
    updated_at: '2025-07-17T20:54:36.167Z'
  },
  {
    id: '340400',
    src: 'https://panoptes-uploads-staging.zooniverse.org/subject_attached_image/b06c48fb-844f-447a-872d-94d244d5b02e.png',
    content_type: 'image/png',
    media_type: 'subject_attached_image',
    external_link: false,
    created_at: '2025-09-30T16:53:50.453Z',
    metadata: {
      size: 446153,
      filename: '609780764988425780_gri_17.8096.png'
    },
    updated_at: '2025-09-30T16:53:50.453Z'
  },
  {
    id: '340402',
    src: 'https://panoptes-uploads-staging.zooniverse.org/subject_attached_image/1b35bba5-9c13-44dd-9601-17247261f386.png',
    content_type: 'image/png',
    media_type: 'subject_attached_image',
    external_link: false,
    created_at: '2025-09-30T16:57:43.831Z',
    metadata: {
      size: 465198,
      filename: '609780764988423705_gri_17.4216.png'
    },
    updated_at: '2025-09-30T16:57:43.831Z'
  }
]

export default {
  title: 'Project App / Screens / Subject Talk / Ancillary Data',
  component: AncillaryData,
  decorators: [(Story) => (
    <Box pad='medium'>
      <Story />
    </Box>
  )]
}

export const Default = {
  args: {
    media: mockMedia
  }
}
