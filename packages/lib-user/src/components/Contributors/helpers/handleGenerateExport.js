import asyncStates from '@zooniverse/async-states'
import { generateExport } from './generateExport'
import { getAllUsers } from './getAllUsers'

export async function handleGenerateExport({
  group,
  memberIdsPerStats,
  projects,
  setExportProgress,
  setExportStatus,
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

    // Create an anchor element and trigger download
    const link = document.createElement('a')
    link.href = dataExportUrl
    link.setAttribute('download', filename)
    document.body.appendChild(link) // Append to the document
    link.click() // Programmatically click the link to trigger the download
    document.body.removeChild(link) // Clean up
  } catch (error) {
    console.error('Error generating export: ', error)
    alert('Error generating export')
  } finally {
    setExportStatus(asyncStates.success)
  }
}
