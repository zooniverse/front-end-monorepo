import { Box } from 'grommet'

import TitledStat from './TitledStat'

export default {
  title: 'Components/shared/TitledStat',
  component: TitledStat,
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
    title: 'Classifications',
    value: 1234
  }
}
