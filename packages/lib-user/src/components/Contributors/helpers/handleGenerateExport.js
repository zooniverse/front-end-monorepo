import asyncStates from '@zooniverse/async-states'
import { arrayOf, func, number, shape, string } from 'prop-types'

import { getAllUsers } from './getAllUsers'
import { generateExport } from './generateExport'

export async function handleGenerateExport({
  group,
  memberIdsPerStats,
  projects,
  setDownloadUrl,
  setExportProgress,
  setExportStatus,
  setErrorMessage,
  stats
}) {
  setExportStatus(asyncStates.loading)
  setExportProgress(0)

  try {
    const allUsers = await getAllUsers({ memberIdsPerStats, setExportProgress })
    
    // set the export status to success, before generating the CSV
    // the CSV file creation may freeze the UI, making it appear as if the process is stuck
    setExportStatus(asyncStates.success)

    // Wait for the UI to update before proceeding
    await new Promise(resolve => setTimeout(resolve, 0)) // Allows React to process the exportStatus state update

    const { filename, dataExportUrl } = await generateExport({
      group,
      projects,
      stats,
      users: allUsers
    })
    
    // Set the download URL and filename for the UI to use
    setDownloadUrl({ url: dataExportUrl, filename })
  } catch (error) {
    console.error('Error generating export: ', error)
    setErrorMessage(error.message)
    setExportStatus(asyncStates.error)
  }
}

handleGenerateExport.propTypes = {
  group: shape({
    id: string,
    display_name: string
  }),
  memberIdsPerStats: arrayOf(string),
  projects: arrayOf(shape({
    display_name: string,
    id: string
  })),
  setDownloadUrl: func,
  setExportProgress: func,
  setExportStatus: func,
  setErrorMessage: func,
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
  })
}
