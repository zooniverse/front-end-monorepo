export function getProjectSelectOptions({ projects = [], selectedProject = undefined }) {
  let projectOptions = [
    { label: 'ALL PROJECTS', value: undefined },
    ...projects
      .map(project => ({
        label: project.display_name,
        value: project.id
      }))
      .sort((a, b) => {
        const nameA = a.label.toUpperCase()
        const nameB = b.label.toUpperCase()
        if (nameA < nameB) {
          return -1
        }
        if (nameA > nameB) {
          return 1
        }
        return 0
      })
  ]
  let selectedProjectOption
  if (selectedProject === undefined) {
    selectedProjectOption = projectOptions[0]
  } else {
    selectedProjectOption = projectOptions.find(option => option.value === selectedProject)
  }

  return { projectOptions, selectedProjectOption }
}
