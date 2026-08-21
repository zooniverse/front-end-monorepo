import RecentSubjects from './RecentSubjects'
import mockRecents from './recents.mock.json'

export default {
  title: 'Components / UserHome / RecentSubjects',
  component: RecentSubjects
}

export const Default = {
  args: {
    login: 'testuser',
    recents: mockRecents,
    userId: '1234'
  }
}

export const NoSubjects = {
  args: {
    recents: []
  }
}

export const Error = {
  args: {
    recents: [],
    error: { message: `Couldn't fetch recent classifications` }
  }
}
