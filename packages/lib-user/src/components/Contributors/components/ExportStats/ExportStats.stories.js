import React from 'react'
import { action } from '@storybook/addon-actions'
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

export function Success() {
  return (
    <ExportStats
      downloadUrl={{
        url: 'https://example.com/contributors-export-12345.csv',
        filename: 'contributors-export-12345.csv'
      }}
      exportStatus={asyncStates.success}
      memberCount={3254}
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
