import asyncStates from '@zooniverse/async-states'

import ExportStats from './ExportStats'

export default {
  title: 'Components/Contributors/ExportStats',
  component: ExportStats
}

export function ConfirmLargeExport() {
  return (
    <ExportStats
      csvSizeEstimate='3.5 MB'
      exportStatus={asyncStates.initialized}
      memberCount={5000}
    />
  )
}

export function ConfirmSmallExport() {
  return (
    <ExportStats
      csvSizeEstimate='750 KB'
      exportStatus={asyncStates.initialized}
      memberCount={400}
    />
  )
}

export function Loading() {
  return (
    <ExportStats
      exportProgress={65}
      exportStatus={asyncStates.loading}
    />
  )
}

export function Error() {
  return (
    <ExportStats
      errorMessage='Network error: Failed to fetch user data'
      exportStatus={asyncStates.error}
    />
  )
}

export function SuccessNoFilename() {
  return (
    <ExportStats
      downloadUrl={{
        url: '',
        filename: ''
      }}
      exportStatus={asyncStates.success}
    />
  )
}

export function SuccessWithFilename() {
  return (
    <ExportStats
      downloadUrl={{
        url: 'https://example.com/TestGroup1234_data_export_2025-01-01T101010.csv',
        filename: 'TestGroup1234_data_export_2025-01-01T101010.csv'
      }}
      exportStatus={asyncStates.success}
    />
  )
}
