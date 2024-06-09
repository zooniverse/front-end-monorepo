import RecentProjects from './RecentProjects.js'
import { PROJECTS } from '../../../../../test/mocks/panoptes/projects.js'

export default {
  title: 'Components / UserHome / RecentProjects',
  component: RecentProjects
}

export const Default = {
  args: {
    projects: [...PROJECTS, ...PROJECTS]
  }
}

export const NoProjects = {
  args: {
    projects: []
  }
}

export const Error = {
  args: {
    projects: [],
    error: { message: `Couldn't fetch recent projects` }
  }
}
