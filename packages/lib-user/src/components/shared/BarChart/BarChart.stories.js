import { Box } from 'grommet'

import { 
  dateRanges
} from '../../../utils'

import {
  last7days,
  last30days,
  thisMonth,
  last3months,
  thisYearLessThan6Months,
  thisYearMoreThan6Months,
  last12months,
  allTime
} from '../../../../test/mocks/stats.mock.js'

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

export const Last7Days = {
  args: {
    data: last7days,
    dateRange: dateRanges.Last7Days,
    getCompleteData: () => {
      return last7days
    },
    getDateInterval: () => ({
      end_date: last7days[-1]?.period,
      period: 'day',
      start_date: last7days[0]?.period
    })
  },
}

export const Last7DaysHours = {
  args: {
    data: last7days,
    dateRange: dateRanges.Last7Days,
    getCompleteData: () => {
      return last7days
    },
    getDateInterval: () => ({
      end_date: last7days[-1]?.period,
      period: 'day',
      start_date: last7days[0]?.period
    }),
    type: 'session_time'
  },
}

export const Last30Days = {
  args: {
    data: last30days,
    dateRange: dateRanges.Last30Days,
    getCompleteData: () => {
      return last30days
    },
    getDateInterval: () => ({
      end_date: last30days[-1]?.period,
      period: 'day',
      start_date: last30days[0]?.period
    })
  },
}

export const Last30DaysHours = {
  args: {
    data: last30days,
    dateRange: dateRanges.Last30Days,
    getCompleteData: () => {
      return last30days
    },
    getDateInterval: () => ({
      end_date: last30days[-1]?.period,
      period: 'day',
      start_date: last30days[0]?.period
    }),
    type: 'session_time'
  },
}

export const ThisMonth = {
  args: {
    data: thisMonth,
    dateRange: dateRanges.ThisMonth,
    getCompleteData: () => {
      return thisMonth
    },
    getDateInterval: () => ({
      end_date: thisMonth[-1]?.period,
      period: 'day',
      start_date: thisMonth[0]?.period
    })
  },
}

export const ThisMonthHours = {
  args: {
    data: thisMonth,
    dateRange: dateRanges.ThisMonth,
    getCompleteData: () => {
      return thisMonth
    },
    getDateInterval: () => ({
      end_date: thisMonth[-1]?.period,
      period: 'day',
      start_date: thisMonth[0]?.period
    }),
    type: 'session_time'
  },
}

export const Last3Months = {
  args: {
    data: last3months,
    dateRange: dateRanges.Last3Months,
    getCompleteData: () => {
      return last3months
    },
    getDateInterval: () => ({
      end_date: last3months[-1]?.period,
      period: 'week',
      start_date: last3months[0]?.period
    })
  },
}

export const Last3MonthsHours = {
  args: {
    data: last3months,
    dateRange: dateRanges.Last3Months,
    getCompleteData: () => {
      return last3months
    },
    getDateInterval: () => ({
      end_date: last3months[-1]?.period,
      period: 'week',
      start_date: last3months[0]?.period
    }),
    type: 'session_time'
  },
}

export const ThisYearLessThan6Months = {
  args: {
    data: thisYearLessThan6Months,
    dateRange: dateRanges.ThisYear,
    getCompleteData: () => {
      return thisYearLessThan6Months
    },
    getDateInterval: () => ({
      end_date: thisYearLessThan6Months[-1]?.period,
      period: 'week',
      start_date: thisYearLessThan6Months[0]?.period
    })
  },
}

export const ThisYearLessThan6MonthsHours = {
  args: {
    data: thisYearLessThan6Months,
    dateRange: dateRanges.ThisYear,
    getCompleteData: () => {
      return thisYearLessThan6Months
    },
    getDateInterval: () => ({
      end_date: thisYearLessThan6Months[-1]?.period,
      period: 'week',
      start_date: thisYearLessThan6Months[0]?.period
    }),
    type: 'session_time'
  },
}

export const ThisYearMoreThan6Months = {
  args: {
    data: thisYearMoreThan6Months,
    dateRange: dateRanges.ThisYear,
    getCompleteData: () => {
      return thisYearMoreThan6Months
    },
    getDateInterval: () => ({
      end_date: thisYearMoreThan6Months[-1]?.period,
      period: 'month',
      start_date: thisYearMoreThan6Months[0]?.period
    })
  },
}

export const ThisYearMoreThan6MonthsHours = {
  args: {
    data: thisYearMoreThan6Months,
    dateRange: dateRanges.ThisYear,
    getCompleteData: () => {
      return thisYearMoreThan6Months
    },
    getDateInterval: () => ({
      end_date: thisYearMoreThan6Months[-1]?.period,
      period: 'month',
      start_date: thisYearMoreThan6Months[0]?.period
    }),
    type: 'session_time'
  },
}

export const Last12Months = {
  args: {
    data: last12months,
    dateRange: dateRanges.Last12Months,
    getCompleteData: () => {
      return last12months
    },
    getDateInterval: () => ({
      end_date: last12months[-1]?.period,
      period: 'month',
      start_date: last12months[0]?.period
    })
  },
}

export const Last12MonthsHours = {
  args: {
    data: last12months,
    dateRange: dateRanges.Last12Months,
    getCompleteData: () => {
      return last12months
    },
    getDateInterval: () => ({
      end_date: last12months[-1]?.period,
      period: 'month',
      start_date: last12months[0]?.period
    }),
    type: 'session_time'
  },
}

export const AllTime = {
  args: {
    data: allTime,
    dateRange: dateRanges.AllTime,
    getCompleteData: () => {
      return allTime
    },
    getDateInterval: () => ({
      end_date: allTime[-1]?.period,
      period: 'year',
      start_date: allTime[0]?.period
    })
  },
}

export const AllTimeHours = {
  args: {
    data: allTime,
    dateRange: dateRanges.AllTime,
    getCompleteData: () => {
      return allTime
    },
    getDateInterval: () => ({
      end_date: allTime[-1]?.period,
      period: 'year',
      start_date: allTime[0]?.period
    }),
    type: 'session_time'
  },
}

// Custom
