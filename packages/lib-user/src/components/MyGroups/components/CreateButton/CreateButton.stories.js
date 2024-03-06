import { Box } from 'grommet'

import CreateButton from './CreateButton'

export default {
  title: 'Components/MyGroups/CreateButton',
  component: CreateButton,
  decorators: [ComponentDecorator]
}

function ComponentDecorator(Story) {
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
    onClick: () => console.log('Create New Group Button Clicked')
  }
}
