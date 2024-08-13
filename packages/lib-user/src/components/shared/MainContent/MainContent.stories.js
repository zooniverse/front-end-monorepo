import { Box } from 'grommet'

import { getStatsDateString } from '@utils'

import { PROJECTS, USER } from '../../../../test/mocks/panoptes'
import { STATS } from '../../../../test/mocks/stats.mock'

import MainContent from './MainContent'

export default {
  title: 'Components/shared/MainContent',
  component: MainContent,
  decorators: [ComponentDecorator]
}

const todayUTC = getStatsDateString(new Date())
const sevenDaysAgoUTC = getStatsDateString(new Date(Date.now() - 6 * 24 * 60 * 60 * 1000))

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
    onActive: () => {},
    projects: PROJECTS,
    selectedDateRange: {
      endDate: todayUTC,
      startDate: sevenDaysAgoUTC
    },
    selectedProject: undefined,
    stats: STATS,
    source: USER
  }
}
