import { observer } from 'mobx-react'
import { createLocationCounts } from '@helpers'
import { useStores } from '@hooks'
import getLayout from './helpers/getLayout'

function storeMapper(classifierStore) {
  const workflow = classifierStore.workflows.active
  const subject = classifierStore.subjects.active

  let multiFrameSubject = false
  if (subject) {
    const locationCounts = createLocationCounts(subject)
    if (locationCounts.total > 1 && locationCounts.total === locationCounts.images) {
      multiFrameSubject = true
    }
  }

  return {
    multiFrameSubject,
    usesTranscriptionTask: workflow?.usesTranscriptionTask
  }
}

function Layout() {
  let layout = 'default'
  const { multiFrameSubject, usesTranscriptionTask } = useStores(storeMapper)
  if (usesTranscriptionTask) {
    layout = 'noMaxWidth'
  } else if (multiFrameSubject && !usesTranscriptionTask) {
    layout = 'multiImage'
  }

  const CurrentLayout = getLayout(layout)
  return <CurrentLayout />
}

export default observer(Layout)
