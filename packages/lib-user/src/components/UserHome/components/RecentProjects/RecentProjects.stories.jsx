import RecentProjects from './RecentProjects'
import { PROJECTS } from '../../../../../test/mocks/panoptes/projects.js'

export default {
  title: 'Components / UserHome / RecentProjects',
  component: RecentProjects
}

export const Default = {
  args: {
    renderedProjects: PROJECTS
  }
}

export const NoProjects = {
  args: {
    renderedProjects: []
  }
}

export const Error = {
  args: {
    renderedProjects: [],
    error: { message: `Couldn't fetch recent projects` }
  }
}
