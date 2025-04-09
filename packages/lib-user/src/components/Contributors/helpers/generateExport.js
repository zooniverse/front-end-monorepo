import dayjs from 'dayjs'
import { arrayOf, number, shape, string } from 'prop-types'

import { getExportData } from './getExportData'

export function generateExport({
  group,
  projects,
  stats,
  users
}) {
  const data = getExportData({ projects, stats, users })

  // Generate CSV content as a string
  const csvRows = data.map((row) => row.map((col) => JSON.stringify(col)).join(','))
  const csvContent = csvRows.join('\n')

  // Sanitize the group name and generate the filename
  const sanitizedGroupName = group.display_name.replace(/[^a-zA-Z0-9]/g, '')
  const date = dayjs().format('YYYY-MM-DDTHHmmss')
  const filename = `${sanitizedGroupName}_data_export_${date}.csv`

  return {
    csvContent,
    filename
  }
}

generateExport.propTypes = {
  group: shape({
    display_name: string
  }),
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
