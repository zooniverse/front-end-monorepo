import asyncStates from '@zooniverse/async-states'
import { array, func, object } from 'prop-types'
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
  group: object,
  handleShowExport: func,
  memberIdsPerStats: array,
  projects: array,
  stats: array
}

export default ExportStatsContainer
