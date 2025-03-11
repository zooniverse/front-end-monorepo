import asyncStates from '@zooniverse/async-states'
import { arrayOf, func, number, shape, string } from 'prop-types'
import { useState } from 'react'

import ExportStats from './ExportStats'
import { handleGenerateExport } from '../../helpers/handleGenerateExport'

function ExportStatsContainer({
  group,
  handleShowExport,
  memberIdsPerStats,
  projects,
  stats
}) {
  const [exportStatus, setExportStatus] = useState(asyncStates.initialized)
  const [exportProgress, setExportProgress] = useState(0)
  const [downloadUrl, setDownloadUrl] = useState({ url: '', filename: '' })
  const [errorMessage, setErrorMessage] = useState('')
  
  // Calculate CSV size estimate
  const approximateSize = memberIdsPerStats?.length * 1.85
  const csvSizeEstimate = approximateSize > 1000 
    ? `${Math.round(approximateSize / 1000)} MB` 
    : `${Math.round(approximateSize)} KB`

  function handleConfirm() {
    setExportStatus(asyncStates.loading)
    handleGenerateExport({
      group,
      memberIdsPerStats,
      projects,
      setDownloadUrl,
      setExportProgress,
      setExportStatus,
      setErrorMessage,
      stats
    })
  }

  function handleClose() {
    handleShowExport(false)
  }

  function handleRetry() {
    setErrorMessage('')
    handleConfirm()
  }

  return (
    <ExportStats
      csvSizeEstimate={csvSizeEstimate}
      downloadUrl={downloadUrl}
      errorMessage={errorMessage}
      exportProgress={exportProgress}
      exportStatus={exportStatus}
      memberCount={memberIdsPerStats?.length || 0}
      onClose={handleClose}
      onConfirm={handleConfirm}
      onRetry={handleRetry}
    />
  )
}

ExportStatsContainer.propTypes = {
  group: shape({
    display_name: string,
    id: string
  }),
  handleShowExport: func,
  memberIdsPerStats: arrayOf(string),
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
  })
}

export default ExportStatsContainer
