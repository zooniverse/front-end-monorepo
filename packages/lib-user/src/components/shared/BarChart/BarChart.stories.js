import { Box } from 'grommet'

import dateRanges from '../../../utils/dateRanges'
import {
  last7days,
  last30days,
  thisMonth,
  last3months,
  thisYear,
  last12months,
  allTime
} from './BarChart.mock.js'

import BarChart from './BarChart.js'

export default {
  title: 'Components/shared/BarChart',
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

export const Default = {
  args: {
    data: last7days,
    dateRange: dateRanges.Last7Days
  },
}

export const Last7DaysHours = {
  args: {
    data: last7days,
    dateRange: dateRanges.Last7Days,
    type: 'session_time'
  },
}

export const Last30Days = {
  args: {
    data: last30days,
    dateRange: dateRanges.Last30Days
  },
}

export const Last30DaysHours = {
  args: {
    data: last30days,
    dateRange: dateRanges.Last30Days,
    type: 'session_time'
  },
}

export const ThisMonth = {
  args: {
    data: thisMonth,
    dateRange: dateRanges.ThisMonth
  },
}

export const ThisMonthHours = {
  args: {
    data: thisMonth,
    dateRange: dateRanges.ThisMonth,
    type: 'session_time'
  },
}

export const Last3Months = {
  args: {
    data: last3months,
    dateRange: dateRanges.Last3Months
  },
}

export const Last3MonthsHours = {
  args: {
    data: last3months,
    dateRange: dateRanges.Last3Months,
    type: 'session_time'
  },
}

// maybe someday ThisYear by week if < 7 months
export const ThisYear = {
  args: {
    data: thisYear,
    dateRange: dateRanges.ThisYear
  },
}

export const ThisYearHours = {
  args: {
    data: thisYear,
    dateRange: dateRanges.ThisYear,
    type: 'session_time'
  },
}

export const Last12Months = {
  args: {
    data: last12months,
    dateRange: dateRanges.Last12Months
  },
}

export const Last12MonthsHours = {
  args: {
    data: last12months,
    dateRange: dateRanges.Last12Months,
    type: 'session_time'
  },
}

export const AllTime = {
  args: {
    data: allTime,
    dateRange: dateRanges.AllTime
  },
}

export const AllTimeHours = {
  args: {
    data: allTime,
    dateRange: dateRanges.AllTime,
    type: 'session_time'
  },
}

// Custom
