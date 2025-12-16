import { Box } from 'grommet'

import { PROJECTS } from '../../../../test/mocks/panoptes'
import { STATS } from '../../../../test/mocks/stats.mock'

import TopProjects from './TopProjects'

export default {
  title: 'Components/shared/TopProjects',
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
      pad='30px'
      width={{ max: '700px' }}
    >
      <Story />
    </Box>
  )
}

export const Default = {
  args: {
    allProjectsStats: STATS,
    projects: PROJECTS,
    linkProps: { href: 'https://www.zooniverse.org/projects' },
  }
}

export const Grid = {
  args: {
    allProjectsStats: STATS,
    grid: true,
    projects: PROJECTS,
    linkProps: { href: 'https://www.zooniverse.org/projects' },
  }
}

export const Loading = {
  args: {
    loading: true
  }
}
