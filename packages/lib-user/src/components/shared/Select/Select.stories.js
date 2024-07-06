import { Box } from 'grommet'

import Select from './Select.js'

import { 
  getDateRangeSelectOptions
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

const options = getDateRangeSelectOptions()

export const DateRanges = {
  args: {
    id: 'DateRanges',
    name: 'DateRanges',
    options: options,
    value: options[0]
  }
}
