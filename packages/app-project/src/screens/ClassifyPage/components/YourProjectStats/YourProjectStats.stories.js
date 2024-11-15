import YourProjectStats from './YourProjectStats'

import {
  getTodayDateString,
  getNumDaysAgoDateString
} from './helpers/dateRangeHelpers'

// Mock stats data of a user who classified on three days in the past seven days
const sevenDaysAgoString = getNumDaysAgoDateString(6)
const threeDaysAgoString = getNumDaysAgoDateString(2)
const todayDateString = getTodayDateString()

const mockData = {
  allTimeStats: {
    total_count: 9436
  },
  sevenDaysStats: {
    data: [
      {
        count: 5,
        period: sevenDaysAgoString
      },
      {
        count: 23,
        period: threeDaysAgoString
      },
      {
        count: 12,
        period: todayDateString
      }
    ],
    total_count: 40
  }
}

export default {
  title: 'Project App / Screens / Classify / YourProjectStats',
  component: YourProjectStats
}

export const NoUser = {
  render: () => <YourProjectStats />
}

export const WithUser = {
  render: () => (
    <YourProjectStats
      data={mockData}
      userID='1234'
      userLogin='zootester1'
      projectID='1234'
    />
  )
}

export const Loading = {
  render: () => (
    <YourProjectStats loading userID='1234' userLogin='zootester1' />
  )
}

export const Error = {
  render: () => (
    <YourProjectStats
      error={{ message: 'There was an error fetching your stats' }}
      userID='1234'
      userLogin='zootester1'
    />
  )
}
