import RecentProjects from './RecentProjects'
import { PROJECTS } from '../../../../../test/mocks/panoptes/projects.js'

const mockProjectPreferencesWithProjectObj = PROJECTS.map(project => ({
  activity_count: Math.floor(Math.random() * 100),
  project
}))

export default {
  title: 'Components / UserHome / RecentProjects',
  component: RecentProjects
}

export const Default = {
  args: {
    projectPreferences: mockProjectPreferencesWithProjectObj
  }
}

export const NoProjects = {
  args: {
    projectPreferences: []
  }
}

export const Error = {
  args: {
    projectPreferences: [],
    error: { message: `Couldn't fetch recent projects` }
  }
}
