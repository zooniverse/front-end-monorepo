export const ProjectStatisticsContainerMock = {
  project: {
    classifiers_count: 40,
    classifications_count: 10,
    display_name: 'Test Project',
    retired_subjects_count: 20,
    subjects_count: 30,
    completeness: 0.5
  }
}

export const ProjectStatisticsContainerRouterMock = {
  asPath: '/foo/bar',
  query: {
    owner: 'foo',
    project: 'bar'
  },
  push: () => {},
  prefetch: () => new Promise((resolve, reject) => {}),
}
