export function getProjectSelectOptions({ projects = [], selectedProject = 'AllProjects' }) {
  let projectOptions = [
    { label: 'ALL PROJECTS', value: 'AllProjects' },
    ...projects.map(project => ({
      label: project.display_name,
      value: project.id
    }))
  ]
  const selectedProjectOption = projectOptions.find(option => option.value === selectedProject)
  return { projectOptions, selectedProjectOption }
}
