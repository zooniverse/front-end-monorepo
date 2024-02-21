import { Box } from 'grommet'

import Select from './Select.js'

import { 
  dateRanges
} from '@utils'

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

const options = dateRanges.values.map((dateRange) => ({
  label: dateRange
    .replace(/([A-Z])/g, ' $1')
    .replace(/([0-9]+)/g, ' $1')
    .toUpperCase()
    .trim(),
  value: dateRange.value
}))

export const DateRanges = {
  args: {
    id: 'DateRanges',
    name: 'DateRanges',
    options: options,
    value: options[0]
  }
}
