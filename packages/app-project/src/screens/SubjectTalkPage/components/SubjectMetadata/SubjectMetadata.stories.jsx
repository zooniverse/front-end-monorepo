import { Box } from 'grommet'

import SubjectMetadata from './SubjectMetadata'

const metadataMock = {
  'RA': '150.32715203',
  'Radius': '0.000307900664592064',
  '!hide_in_classifier': 'should_not_be_displayed in Classifier, should be displayed in Talk',
  'desi_link': 'https://desi.lbl.gov',
  'sersic_index': '1.2598578519847092',
  'Dec': 'With Markdown\n~~are you sure?~~\n**YES!**',
  'ned_link': 'https://ned.ipac.caltech.edu',
  '#hidden_key': 'should_not_be_displayed',
  'esasky_link': '[Click to view in ESA Sku](https://www.eso.org/public/images/eso0932a/)',
  'F444W_magnitude': '21.08619625578267',
}

export default {
  title: 'Project App / Screens / Subject Talk / SubjectMetadata',
  component: SubjectMetadata,
  decorators: [(Story) => (
    <Box pad='medium'>
      <Story />
    </Box>
  )]
}

export const Default = {
  args: {
    metadata: metadataMock
  }
}

export const NoMetadata = {
  args: {
    metadata: {}
  }
}
