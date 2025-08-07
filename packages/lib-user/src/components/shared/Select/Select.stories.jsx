import { Box } from 'grommet'

import Select from './Select'

export default {
  title: 'Components/shared/Select',
  component: Select,
  decorators: [ComponentDecorator]
}

function ComponentDecorator (Story) {
  return (
    <Box
      background={{
        dark: 'dark-3',
        light: 'neutral-6'
      }}
      fill
      pad='30px'
    >
      <Story />
    </Box>
  )
}

export const Default = {
  args: {
    id: 'select',
    name: 'select',
    options: [
      { label: 'ALL PROJECTS', value: undefined },
      { label: 'Project 1', value: '111' },
      { label: 'Project 2', value: '222' },
      { label: 'Project 3', value: '333' }
    ],
    value: { label: 'ALL PROJECTS', value: undefined }
  }
}
