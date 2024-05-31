import RecentSubjects from './RecentSubjects'
import mockSubjects from './subjects.mock.json'

export default {
  title: 'Components / UserHome / RecentSubjects',
  component: RecentSubjects
}

export const Default = {
  args: {
    subjects: mockSubjects
  }
}

export const NoSubjects = {
  args: {
    subjects: []
  }
}
