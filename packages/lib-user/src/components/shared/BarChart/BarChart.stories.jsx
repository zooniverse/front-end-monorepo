import { Box } from 'grommet'

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

import BarChart from './BarChart'

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
    dateRange: {
      endDate: last7days[last7days.length - 1]?.period.substring(0, 10),
      startDate: last7days[0]?.period.substring(0, 10)
    },
    getCompleteData: () => {
      return last7days.map((data, index) => ({
        index,
        ...data,
      }))
    },
    getDateInterval: () => ({
      end_date: last7days[last7days.length - 1]?.period.substring(0, 10),
      period: 'day',
      start_date: last7days[0]?.period.substring(0, 10)
    })
  },
}

export const Last7DaysHours = {
  args: {
    data: last7days,
    dateRange: {
      endDate: last7days[last7days.length - 1]?.period.substring(0, 10),
      startDate: last7days[0]?.period.substring(0, 10)
    },
    getCompleteData: () => {
      return last7days.map((data, index) => ({
        index,
        ...data,
      }))
    },
    getDateInterval: () => ({
      end_date: last7days[last7days.length - 1]?.period.substring(0, 10),
      period: 'day',
      start_date: last7days[0]?.period.substring(0, 10)
    }),
    type: 'session_time'
  },
}

export const Last30Days = {
  args: {
    data: last30days,
    dateRange: {
      endDate: last30days[last30days.length - 1]?.period.substring(0, 10),
      startDate: last30days[0]?.period.substring(0, 10)
    },
    getCompleteData: () => {
      return last30days.map((data, index) => ({
        index,
        ...data,
      }))
    },
    getDateInterval: () => ({
      end_date: last30days[last30days.length - 1]?.period.substring(0, 10),
      period: 'day',
      start_date: last30days[0]?.period.substring(0, 10)
    })
  },
}

export const Last30DaysHours = {
  args: {
    data: last30days,
    dateRange: {
      endDate: last30days[last30days.length - 1]?.period.substring(0, 10),
      startDate: last30days[0]?.period.substring(0, 10)
    },
    getCompleteData: () => {
      return last30days.map((data, index) => ({
        index,
        ...data,
      }))
    },
    getDateInterval: () => ({
      end_date: last30days[last30days.length - 1]?.period.substring(0, 10),
      period: 'day',
      start_date: last30days[0]?.period.substring(0, 10)
    }),
    type: 'session_time'
  },
}

export const ThisMonth = {
  args: {
    data: thisMonth,
    dateRange: {
      endDate: thisMonth[thisMonth.length - 1]?.period.substring(0, 10),
      startDate: thisMonth[0]?.period.substring(0, 10)
    },
    getCompleteData: () => {
      return thisMonth.map((data, index) => ({
        index,
        ...data,
      }))
    },
    getDateInterval: () => ({
      end_date: thisMonth[thisMonth.length - 1]?.period.substring(0, 10),
      period: 'day',
      start_date: thisMonth[0]?.period.substring(0, 10)
    })
  },
}

export const ThisMonthHours = {
  args: {
    data: thisMonth,
    dateRange: {
      endDate: thisMonth[thisMonth.length - 1]?.period.substring(0, 10),
      startDate: thisMonth[0]?.period.substring(0, 10)
    },
    getCompleteData: () => {
      return thisMonth.map((data, index) => ({
        index,
        ...data,
      }))
    },
    getDateInterval: () => ({
      end_date: thisMonth[thisMonth.length - 1]?.period.substring(0, 10),
      period: 'day',
      start_date: thisMonth[0]?.period.substring(0, 10)
    }),
    type: 'session_time'
  },
}

export const Last3Months = {
  args: {
    data: last3months,
    dateRange: {
      endDate: last3months[last3months.length - 1]?.period.substring(0, 10),
      startDate: last3months[0]?.period.substring(0, 10)
    },
    getCompleteData: () => {
      return last3months.map((data, index) => ({
        index,
        ...data,
      }))
    },
    getDateInterval: () => ({
      end_date: last3months[last3months.length - 1]?.period.substring(0, 10),
      period: 'week',
      start_date: last3months[0]?.period.substring(0, 10)
    })
  },
}

export const Last3MonthsHours = {
  args: {
    data: last3months,
    dateRange: {
      endDate: last3months[last3months.length - 1]?.period.substring(0, 10),
      startDate: last3months[0]?.period.substring(0, 10)
    },
    getCompleteData: () => {
      return last3months.map((data, index) => ({
        index,
        ...data,
      }))
    },
    getDateInterval: () => ({
      end_date: last3months[last3months.length - 1]?.period.substring(0, 10),
      period: 'week',
      start_date: last3months[0]?.period.substring(0, 10)
    }),
    type: 'session_time'
  },
}

export const ThisYearLessThan6Months = {
  args: {
    data: thisYearLessThan6Months,
    dateRange: {
      endDate: thisYearLessThan6Months[thisYearLessThan6Months.length - 1]?.period.substring(0, 10),
      startDate: thisYearLessThan6Months[0]?.period.substring(0, 10)
    },
    getCompleteData: () => {
      return thisYearLessThan6Months.map((data, index) => ({
        index,
        ...data,
      }))
    },
    getDateInterval: () => ({
      end_date: thisYearLessThan6Months[thisYearLessThan6Months.length - 1]?.period.substring(0, 10),
      period: 'week',
      start_date: thisYearLessThan6Months[0]?.period.substring(0, 10)
    })
  },
}

export const ThisYearLessThan6MonthsHours = {
  args: {
    data: thisYearLessThan6Months,
    dateRange: {
      endDate: thisYearLessThan6Months[thisYearLessThan6Months.length - 1]?.period.substring(0, 10),
      startDate: thisYearLessThan6Months[0]?.period.substring(0, 10)
    },
    getCompleteData: () => {
      return thisYearLessThan6Months.map((data, index) => ({
        index,
        ...data,
      }))
    },
    getDateInterval: () => ({
      end_date: thisYearLessThan6Months[thisYearLessThan6Months.length - 1]?.period.substring(0, 10),
      period: 'week',
      start_date: thisYearLessThan6Months[0]?.period.substring(0, 10)
    }),
    type: 'session_time'
  },
}

export const ThisYearMoreThan6Months = {
  args: {
    data: thisYearMoreThan6Months,
    dateRange: {
      endDate: thisYearMoreThan6Months[thisYearMoreThan6Months.length - 1]?.period.substring(0, 10),
      startDate: thisYearMoreThan6Months[0]?.period.substring(0, 10)
    },
    getCompleteData: () => {
      return thisYearMoreThan6Months.map((data, index) => ({
        index,
        ...data,
      }))
    },
    getDateInterval: () => ({
      end_date: thisYearMoreThan6Months[thisYearMoreThan6Months.length - 1]?.period.substring(0, 10),
      period: 'month',
      start_date: thisYearMoreThan6Months[0]?.period.substring(0, 10)
    })
  },
}

export const ThisYearMoreThan6MonthsHours = {
  args: {
    data: thisYearMoreThan6Months,
    dateRange: {
      endDate: thisYearMoreThan6Months[thisYearMoreThan6Months.length - 1]?.period.substring(0, 10),
      startDate: thisYearMoreThan6Months[0]?.period.substring(0, 10)
    },
    getCompleteData: () => {
      return thisYearMoreThan6Months.map((data, index) => ({
        index,
        ...data,
      }))
    },
    getDateInterval: () => ({
      end_date: thisYearMoreThan6Months[thisYearMoreThan6Months.length - 1]?.period.substring(0, 10),
      period: 'month',
      start_date: thisYearMoreThan6Months[0]?.period.substring(0, 10)
    }),
    type: 'session_time'
  },
}

export const Last12Months = {
  args: {
    data: last12months,
    dateRange: {
      endDate: last12months[last12months.length - 1]?.period.substring(0, 10),
      startDate: last12months[0]?.period.substring(0, 10)
    },
    getCompleteData: () => {
      return last12months.map((data, index) => ({
        index,
        ...data,
      }))
    },
    getDateInterval: () => ({
      end_date: last12months[last12months.length - 1]?.period.substring(0, 10),
      period: 'month',
      start_date: last12months[0]?.period.substring(0, 10)
    })
  },
}

export const Last12MonthsHours = {
  args: {
    data: last12months,
    dateRange: {
      endDate: last12months[last12months.length - 1]?.period.substring(0, 10),
      startDate: last12months[0]?.period.substring(0, 10)
    },
    getCompleteData: () => {
      return last12months.map((data, index) => ({
        index,
        ...data,
      }))
    },
    getDateInterval: () => ({
      end_date: last12months[last12months.length - 1]?.period.substring(0, 10),
      period: 'month',
      start_date: last12months[0]?.period.substring(0, 10)
    }),
    type: 'session_time'
  },
}

export const AllTime = {
  args: {
    data: allTime,
    dateRange: {
      endDate: allTime[allTime.length - 1]?.period.substring(0, 10),
      startDate: allTime[0]?.period.substring(0, 10)
    },
    getCompleteData: () => {
      return allTime.map((data, index) => ({
        index,
        ...data,
      }))
    },
    getDateInterval: () => ({
      end_date: allTime[allTime.length - 1]?.period.substring(0, 10),
      period: 'year',
      start_date: allTime[0]?.period.substring(0, 10)
    })
  },
}

export const AllTimeHours = {
  args: {
    data: allTime,
    dateRange: {
      endDate: allTime[allTime.length - 1]?.period.substring(0, 10),
      startDate: allTime[0]?.period.substring(0, 10)
    },
    getCompleteData: () => {
      return allTime.map((data, index) => ({
        index,
        ...data,
      }))
    },
    getDateInterval: () => ({
      end_date: allTime[allTime.length - 1]?.period.substring(0, 10),
      period: 'year',
      start_date: allTime[0]?.period.substring(0, 10)
    }),
    type: 'session_time'
  },
}

// Custom
