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
      startDate: '2015-03-17'
    },
    selectedProject: undefined
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
      startDate: '2015-03-17'
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
    selectedProject: undefined
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
    selectedProject: undefined
  }
}

export const ParamsValidationMessage = {
  args: {
    login: 'testUser',
    name: 'Example T. User',
    paramsValidationMessage: 'Invalid start_date, must be in the format YYYY-MM-DD',
    selectedProject: undefined
  }
}
