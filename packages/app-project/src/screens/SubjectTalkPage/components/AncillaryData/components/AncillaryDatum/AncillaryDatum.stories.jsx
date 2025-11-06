import { Box } from 'grommet'

import AncillaryDatum from './AncillaryDatum'

export default {
  title: 'Project App / Screens / Subject Talk / Ancillary Data / Ancillary Datum',
  component: AncillaryDatum,
  decorators: [(Story) => (
    <Box pad={{ horizontal: 'small', vertical: 'xlarge' }}>
      <Story />
    </Box>
  )]
}

export const Default = {
  args: {
    datum: {
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
    }
  }
}

export const PortraitImage = {
  args: {
    datum: {
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
    }
  }
}
