import { Box } from 'grommet'

import { PROJECTS, USER } from '../../../../test/mocks/panoptes'
import { STATS } from '../../../../test/mocks/stats.mock'

import MainContent from './MainContent'

export default {
  title: 'Components/shared/MainContent',
  component: MainContent,
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
    >
      <Story />
    </Box>
  )
}

export const Default = {
  args: {
    activeTab: 0,
    handleDateRangeSelect: () => {},
    handleProjectSelect: () => {},
    onActive: () => {},
    projects: PROJECTS,
    selectedDateRange: {
      endDate: '2021-07-07',
      startDate: '2021-07-01'
    },
    selectedProject: 'AllProjects',
    stats: STATS,
    source: USER
  }
}
