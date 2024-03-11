import { Box } from 'grommet'

import GroupForm from './GroupForm'

export default {
  title: 'Components/MyGroups/GroupForm',
  component: GroupForm,
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
    handleSubmit: (event) => console.log('submitting...', event.value)
  }
}
