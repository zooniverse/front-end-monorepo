import RecentProjects from './RecentProjects.js'
import { PROJECTS } from '../../../../../test/mocks/panoptes/projects.js'

const projectsWithCount = PROJECTS.map(project => {
  project.user_classifications = Math.floor(Math.random() * 100)
  return project
})

export default {
  title: 'Components / UserHome / RecentProjects',
  component: RecentProjects
}

export const Default = {
  args: {
    projects: projectsWithCount
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
