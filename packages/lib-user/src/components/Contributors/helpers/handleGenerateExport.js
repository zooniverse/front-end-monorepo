import asyncStates from '@zooniverse/async-states'
import { generateExport } from './generateExport'
import { getAllUsers } from './getAllUsers'

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

    const { filename, dataExportUrl } = await generateExport({
      group,
      projects,
      stats,
      users: allUsers
    })
    
    // Set the download URL and filename for the UI to use
    setDownloadUrl({ url: dataExportUrl, filename })
    setExportStatus(asyncStates.success)
  } catch (error) {
    console.error('Error generating export: ', error)
    setErrorMessage(error.message || 'Failed to generate export')
    setExportStatus(asyncStates.error)
  }
}
