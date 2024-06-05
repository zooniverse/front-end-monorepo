import { Box } from 'grommet'

import GroupForm from './GroupForm'

export default {
  title: 'Components/shared/GroupForm',
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
      overflow='auto'
      pad='30px'
    >
      <Story />
    </Box>
  )
}

export const Create = {
  args: {
    handleSubmit: (event) => console.log('submitting...', event.value)
  }
}

export const Manage = {
  args: {
    defaultValue: {
      display_name: 'Test Group Name',
      id: '1',
      visibility: 'Public',
      stats_visibility: 'public_show_all'
    },
    handleDelete: () => console.log('deleting...'),
    handleSubmit: (event) => {
      event.preventDefault()
      console.log('submitting...', event.value)
    }
  }
}
