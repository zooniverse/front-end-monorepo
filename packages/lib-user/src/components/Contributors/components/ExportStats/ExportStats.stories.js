import asyncStates from '@zooniverse/async-states'

import ExportStats from './ExportStats'

export default {
  title: 'Components/Contributors/ExportStats',
  component: ExportStats
}

export function Loading() {
  return (
    <ExportStats 
      exportProgress={50} 
      exportStatus={asyncStates.loading}
    />
  )
}
