import { arrayOf, number, shape, string } from 'prop-types'

export function getExportData ({
  stats,
  projects,
  users
}) {
  // create a list of all project names
  let privateProjectIndex = 1
  const projectNames = [...new Set(
    stats.group_member_stats_breakdown.flatMap(member => {
    return member.project_contributions.map(statsProject => {
      const project = projects.find(project => project.id === statsProject.project_id.toString())
      return project?.display_name || `Private Project ${privateProjectIndex++}`
    })
  }))]

  // create header row
  const data = [
    [
      'Display Name', 'Username', 'Total Classifications', 'Total Hours',
      ...projectNames.flatMap(projectName => [`${projectName} Classifications`, `${projectName} Hours`])
    ]
  ]

  // iterate over each member and create a row for each member's stats
  for (const member of stats.group_member_stats_breakdown) {
    const user = users.find(user => user.id === member.user_id.toString())
    if (!user) continue

    const row = [
      user.display_name,
      user.login,
      member.count,
      member.session_time
    ]

    // iterate over each project and add the member stats for that project or 0 if the member has no stats for that project
    for (const projectName of projectNames) {
      const projectStats = member.project_contributions
        .find(statsProject => {
          const project = projects.find(project => project.id === statsProject.project_id.toString())
          return project?.display_name === projectName
        })
      row.push(projectStats?.count || 0)
      row.push(projectStats?.session_time || 0)
    }
    data.push(row)
  }

  return data
}

getExportData.propTypes = {
  projects: arrayOf(shape({
    display_name: string,
    id: string
  })),
  stats: shape({
    group_member_stats_breakdown: arrayOf(shape({
      user_id: number,
      count: number,
      session_time: number,
      project_contributions: arrayOf(shape({
        project_id: number,
        count: number,
        session_time: number
      }))
    }))
  }),
  users: arrayOf(shape({
    id: string,
    display_name: string,
    login: string
  }))
}
