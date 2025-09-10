import ProjectStatistics from './ProjectStatistics'

export default {
  title: 'Project App / shared / Project Statistics',
  component: ProjectStatistics,
  args: {
    classifications: 10,
    completedSubjects: 20,
    linkProps: {
      externalLink: true,
      href: `/projects/mockOwner/mockProject/stats`
    },
    projectName: 'Test Project',
    subjects: 30,
    volunteers: 40
  }
}

export const Default = {}
Default.args = {
  completeness: 0.5
}

export const OneHundred = {}
OneHundred.args = {
  classifications: 5699743,
  completedSubjects: 69532,
  completeness: 1,
  subjects: 1000000,
  volunteers: 6943
}

export const Zero = {}
Zero.args = {
  classifications: 0,
  completedSubjects: 0,
  completeness: 0,
  subjects: 0,
  volunteers: 0
}
