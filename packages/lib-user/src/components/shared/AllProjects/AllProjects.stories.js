import { PROJECTS } from '../../../../test/mocks/panoptes'

import AllProjects from './AllProjects.js'

export default {
  title: 'Components/shared/AllProjects',
  component: AllProjects
}

export const Default = {
  args: {
    error: null,
    loading: false,
    projects: PROJECTS
  }
}

export const Loading =  {
  args: {
    error: null,
    loading: true,
    projects: PROJECTS
  }
}

export const Error =  {
  args: {
    error: { message: `Couldn't fetch projects`, status: 500 },
    loading: false,
    projects: PROJECTS
  }
}
export const NoProjects = {
  args: {
    error: null,
    loading: false,
    projects: []
  }
}
