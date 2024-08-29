export function getProjectSelectOptions({ projects = [], selectedProject = undefined }) {
  let projectOptions = [
    { label: 'ALL PROJECTS', value: undefined },
    ...projects.map(project => ({
      label: project.display_name,
      value: project.id
    }))
  ]
  let selectedProjectOption
  if (selectedProject === undefined) {
    selectedProjectOption = projectOptions[0]
  } else {
    selectedProjectOption = projectOptions.find(option => option.value === selectedProject)
  }

  return { projectOptions, selectedProjectOption }
}
