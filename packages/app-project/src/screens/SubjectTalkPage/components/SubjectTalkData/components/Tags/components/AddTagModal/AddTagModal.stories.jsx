import { Box } from 'grommet'

import AddTagModal from './AddTagModal'

export default {
  title: 'Project App / Screens / Subject Talk / Talk Data / Tags / AddTagModal',
  component: AddTagModal,
  decorators: [(Story) => (
    <Box
      pad='large'
    >
      <Story />
    </Box>
  )]
}

export const Default = {
  args: {
    active: true,
    disabled: false,
    onClose: () => console.log('closing modal'),
    onTagClick: (tag) => console.log('tag clicked', tag),
    projectDisplayName: 'Redshift Wrangler',
    tags: [
      { id: '1', name: 'emission-line' },
      { id: '2', name: 'emission_line' },
      { id: '3', name: 'no_emission_absorption_lines' },
      { id: '4', name: 'emission_lines' },
      { id: '5', name: 'sky_lines' },
      { id: '6', name: 'noise' },
      { id: '7', name: 'absorption_line' },
      { id: '8', name: 'absorption_lines' },
      { id: '9', name: 'chip_gap' },
      { id: '10', name: 'serendipitous_object' }
    ]
  }
}

export const NoTags = {
  args: {
    ...Default.args,
    tags: []
  }
}

export const Error = {
  args: {
    ...Default.args,
    error: { message: 'Detailed error message.' }
  }
}

export const Loading = {
  args: {
    ...Default.args,
    loading: true
  }
}
