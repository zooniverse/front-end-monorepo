import { arrayOf, func, number, shape, string } from 'prop-types'

import { getExportData } from './getExportData'

const DEFAULT_HANDLER = () => true

export function generateExport({
  group,
  handleFileName = DEFAULT_HANDLER,
  handleDataExportUrl = DEFAULT_HANDLER,
  projects,
  stats,
  users
}) {
  const data = getExportData({ projects, stats, users })

  let str = ''

  data.forEach((row) => {
    str += row.map((col) => JSON.stringify(col)).join(',').concat('\n')
  })

  let newFilename = `${group.display_name}.data_export.${Date.now()}.csv`
  handleFileName(newFilename)

  let file = new File([str], newFilename, { type: 'text/csv' })
  let newDataExportUrl = URL.createObjectURL(file)
  handleDataExportUrl(newDataExportUrl)
}

generateExport.propTypes = {
  group: shape({
    display_name: string
  }),
  handleFileName: func,
  handleDataExportUrl: func,
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
