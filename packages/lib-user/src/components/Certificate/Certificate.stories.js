import Certificate from './Certificate'

export default {
  title: 'Components/Certificate',
  component: Certificate
}

export const Default = {
  args: {
    hours: 45,
    login: 'testUser',
    name: 'Example T. User',
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
    hours: 12.8,
    login: 'testUser',
    name: 'Example T. User',
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
    hours: 20.1,
    login: 'testUser',
    name: 'Example T. User',
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
    hours: 45,
    login: 'testUser',
    name: 'Example T. User',
    projectsCount: 67,
    selectedDateRange: {
      endDate: '2021-12-31',
      startDate: '2021-01-01'
    },
    selectedProject: 'AllProjects'
  }
}

export const PrePanoptesInfo = {
  args: {
    hours: 45,
    login: 'testUser',
    name: 'Example T. User',
    projectsCount: 67,
    selectedDateRange: {
      endDate: '2023-12-31',
      startDate: '2015-03-17'
    },
    selectedProject: 'AllProjects',
    showPrePanoptesInfo: true
  }
}
