import { Box } from 'grommet'

import ProjectStats from './ProjectStats'

export default {
  title: 'Components/Contributors/ProjectStats',
  component: ProjectStats,
  decorators: [ComponentDecorator]
}

function ComponentDecorator(Story) {
  return (
    <Box
      background={{
        dark: 'dark-3',
        light: 'neutral-6'
      }}
      pad='30px'
    >
      <Story />
    </Box>
  )
}

export const Default = {
  args: {
    classifications: 1234,
    hours: 567,
    projectDisplayName: 'Galaxy Zoo'
  }
}
