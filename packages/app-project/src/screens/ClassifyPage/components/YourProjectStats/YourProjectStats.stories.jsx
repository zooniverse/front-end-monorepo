import YourProjectStats from './YourProjectStats'

const mockData = {
  allTimeStats: {
    total_count: 9436
  },
  sevenDaysStats: {
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
