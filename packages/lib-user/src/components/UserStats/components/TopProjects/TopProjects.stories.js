import { Box } from 'grommet'

import { PROJECTS } from '../../../../../test/mocks/panoptes.mock.js'

import TopProjects from './TopProjects'

export default {
  title: 'Components/UserStats/TopProjects',
  component: TopProjects,
  decorators: [ComponentDecorator]
}

function ComponentDecorator (Story) {
  return (
    <Box
      background={{
        dark: 'dark-3',
        light: 'neutral-6'
      }}
      height='900px'
      pad='30px'
    >
      <Story />
    </Box>
  )
}

export const Default = {
  args: {
    topProjects: PROJECTS
  }
}
