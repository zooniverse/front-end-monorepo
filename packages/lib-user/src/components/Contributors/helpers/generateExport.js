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

  let str = ''

  data.forEach((row) => {
    str += row.map((col) => JSON.stringify(col)).join(',').concat('\n')
  })

  // The following regexp sanitizes the group name by removing all non-alphanumeric characters (i.e. emojis, spaces, punctuation, etc.)
  const sanitizedGroupName = group.display_name.replace(/[^a-zA-Z0-9]/g, '')
  const date = dayjs().format('YYYY-MM-DDTHHmmss')
  const filename = `${sanitizedGroupName}_data_export_${date}.csv`

  let file = new File([str], filename, { type: 'text/csv' })
  let dataExportUrl = URL.createObjectURL(file)
  
  return {
    filename,
    dataExportUrl
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
