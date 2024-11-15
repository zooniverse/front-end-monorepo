import YourProjectStats from './YourProjectStats'

const mockData = {
  allTimeStats: {
    period: [],
    total_count: 37564
  },
  sevenDaysStats: {
    period: [],
    total_count: 84
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
