import { Box } from 'grommet'

import MetadataIconButton from './MetadataIconButton'

const DEFAULT_METADATA = {
  id: 1,
  href: 'https://zooniverse.org',
  '#hidden': 'hidden value',
  '!onlyTalk': 'only talk value',
  foo: null
}

const FILTERED_METADATA = {
  '#hidden': 'hidden value',
  '//hidden': 'another hidden value',
  '!onlyTalk': 'only talk value'
}

export default {
  title: 'Components / MetadataIconButton',
  component: MetadataIconButton,
  decorators: [
    (Story) => (
      <Box pad='large'>
        <Story />
      </Box>
    )
  ]
}

export const Default = {
  args: {
    metadata: DEFAULT_METADATA
  }
}

export const Disabled = {
  args: {
    disabled: true,
    metadata: DEFAULT_METADATA
  }
}

export const FilteredMetadataOnly = {
  args: {
    metadata: FILTERED_METADATA
  }
}
