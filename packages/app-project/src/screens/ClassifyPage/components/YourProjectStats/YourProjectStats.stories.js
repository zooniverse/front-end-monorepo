import YourProjectStats from './YourProjectStats'

const mockData = {
  allTimeStats: {
    period: [],
    total_count: 84
  },
  sevenDaysStats: {
    period: [],
    total_count: 674328
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
  render: () => <YourProjectStats data={mockData} userID='1234' />
}

export const Loading = {
  render: () => <YourProjectStats loading />
}

export const Error = {
  render: () => <YourProjectStats error />
}
