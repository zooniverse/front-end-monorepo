import Certificate from './Certificate'

export default {
  title: 'Components/Certificate',
  component: Certificate
}

export const Default = {
  args: {
    creditedName: 'Example T. User',
    displayName: 'ExampleUser',
    hours: 45,
    login: 'testUser',
    projectsCount: 67,
    selectedDateRange: {
      endDate: '2023-12-31',
      startDate: '2015-07-01'
    },
    selectedProject: 'AllProjects'
  }
}

export const ProjectSpecific = {
  args: {
    creditedName: 'Example T. User',
    displayName: 'Example User',
    hours: 12.8,
    login: 'testUser',
    projectDisplayName: 'Test Project',
    selectedDateRange: {
      endDate: '2023-12-31',
      startDate: '2015-07-01'
    },
    selectedProject: 'Galaxy Zoo'
  }
}

export const ThisMonth = {
  args: {
    creditedName: 'Example T. User',
    displayName: 'Example User',
    hours: 20.1,
    login: 'testUser',
    projectsCount: 67,
    selectedDateRange: {
      endDate: '2021-07-31',
      startDate: '2021-07-01'
    },
    selectedProject: 'AllProjects'
  }
}

export const ThisYear = {
  args: {
    creditedName: 'Example T. User',
    displayName: 'Example User',
    hours: 45,
    login: 'testUser',
    projectsCount: 67,
    selectedDateRange: {
      endDate: '2021-12-31',
      startDate: '2021-01-01'
    },
    selectedProject: 'AllProjects'
  }
}
