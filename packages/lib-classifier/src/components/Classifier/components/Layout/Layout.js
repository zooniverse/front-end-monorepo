import { observer } from 'mobx-react'

import { useStores } from '@hooks'
import getLayout from './helpers/getLayout'

function storeMapper(classifierStore) {
  const workflow = classifierStore.workflows.active
  const limitSubjectHeight = workflow?.configuration?.limit_subject_height
  const layout = limitSubjectHeight ? 'centered' : workflow?.layout

  const flipbookViewMode = classifierStore.subjectViewer.flipbookViewMode
  const separateFramesView = flipbookViewMode === 'separate'

  return {
    layout,
    separateFramesView
  }
}

function Layout() {
  // `getLayout()` will always return the default layout as a fallback
  const { layout, separateFramesView } = useStores(storeMapper)
  const CurrentLayout = getLayout(layout)
  return <CurrentLayout separateFramesView={separateFramesView} />
}

export default observer(Layout)
