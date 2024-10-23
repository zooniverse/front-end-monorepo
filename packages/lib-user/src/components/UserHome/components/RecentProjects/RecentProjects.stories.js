import RecentProjects from './RecentProjects.js'
import { PROJECTS } from '../../../../../test/mocks/panoptes/projects.js'

const mockRecentProjects = PROJECTS.map(project => {
  return {
    count: Math.floor(Math.random() * 100),
    ...project
  }
})

export default {
  title: 'Components / UserHome / RecentProjects',
  component: RecentProjects
}

export const Default = {
  args: {
    recentProjects: mockRecentProjects
  }
}

export const NoProjects = {
  args: {
    recentProjects: []
  }
}

export const Error = {
  args: {
    recentProjects: [],
    error: { message: `Couldn't fetch recent projects` }
  }
}
