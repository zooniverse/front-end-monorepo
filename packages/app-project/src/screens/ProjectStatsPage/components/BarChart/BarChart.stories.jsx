import { Box } from 'grommet'

import {
  last7days,
  last30days,
  last3months,
  allTime
} from './mocks/stats.mock'

import BarChart from './BarChart'

export default {
  title: 'Project App / Screens / Project Stats / BarChart',
  component: BarChart,
  decorators: [ComponentDecorator]
}

function ComponentDecorator (Story) {
  return (
    <Box
      background={{
        dark: 'dark-3',
        light: 'neutral-6'
      }}
      height='medium'
      pad='30px'
    >
      <Story />
    </Box>
  )
}

export const Last7Days = {
  args: {
    data: last7days,
    dateRange: {
      endDate: last7days[last7days.length - 1]?.period.substring(0, 10),
      startDate: last7days[0]?.period.substring(0, 10)
    },
  }
}

export const Last7DaysComments = {
  args: {
    data: last7days,
    dateRange: {
      endDate: last7days[last7days.length - 1]?.period.substring(0, 10),
      startDate: last7days[0]?.period.substring(0, 10)
    },
    type: 'comments'
  },
}

export const Last30Days = {
  args: {
    data: last30days,
    dateRange: {
      endDate: last30days[last30days.length - 1]?.period.substring(0, 10),
      startDate: last30days[0]?.period.substring(0, 10)
    },
  }
}

export const Last30DaysHours = {
  args: {
    data: last30days,
    dateRange: {
      endDate: last30days[last30days.length - 1]?.period.substring(0, 10),
      startDate: last30days[0]?.period.substring(0, 10)
    },
    type: 'comments'
  },
}

export const Last3Months = {
  args: {
    data: last3months,
    dateRange: {
      endDate: last3months[last3months.length - 1]?.period.substring(0, 10),
      startDate: last3months[0]?.period.substring(0, 10)
    },
  },
}

export const Last3MonthsComments = {
  args: {
    data: last3months,
    dateRange: {
      endDate: last3months[last3months.length - 1]?.period.substring(0, 10),
      startDate: last3months[0]?.period.substring(0, 10)
    },
    type: 'comments'
  },
}

export const AllTime = {
  args: {
    data: allTime,
    dateRange: {
      endDate: allTime[allTime.length - 1]?.period.substring(0, 10),
      startDate: allTime[0]?.period.substring(0, 10)
    },
  }
}

export const AllTimeComments = {
  args: {
    data: allTime,
    dateRange: {
      endDate: allTime[allTime.length - 1]?.period.substring(0, 10),
      startDate: allTime[0]?.period.substring(0, 10)
    },
    type: 'comments'
  },
}
