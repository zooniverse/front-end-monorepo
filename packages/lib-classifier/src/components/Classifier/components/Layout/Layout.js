import { observer } from 'mobx-react'
import { useStores } from '@hooks'
import getLayout from './helpers/getLayout'

function storeMapper(classifierStore) {
  const workflow = classifierStore.workflows.active
  const subject = classifierStore.subjects.active

  return {
    multiFrameSubject: subject?.isMultiFrameSubject,
    usesTranscriptionTask: workflow?.usesTranscriptionTask
  }
}

function Layout() {
  const { multiFrameSubject, usesTranscriptionTask } = useStores(storeMapper)

  let layout = 'default'
  if (usesTranscriptionTask) {
    layout = 'noMaxWidth'
  } else if (multiFrameSubject && !usesTranscriptionTask) {
    layout = 'multiFrame'
  }

  const CurrentLayout = getLayout(layout)
  return <CurrentLayout />
}

export default observer(Layout)
