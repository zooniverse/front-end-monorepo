import { observer } from 'mobx-react'

import { useStores } from '@hooks'
import { ZoomProvider } from '@plugins/drawingTools/shared/ZoomContext'
import getLayout from './helpers/getLayout'

function storeMapper(classifierStore) {
  const workflow = classifierStore.workflows.active
  const limitSubjectHeight = workflow?.configuration?.limit_subject_height
  const layout = limitSubjectHeight ? 'centered' : workflow?.layout
  const separateFramesView = classifierStore.subjectViewer.separateFramesView

  return {
    layout,
    separateFramesView
  }
}

function Layout() {
  // `getLayout()` will always return the default layout as a fallback
  const { layout, separateFramesView } = useStores(storeMapper)
  const CurrentLayout = getLayout(layout)
  return (
    <ZoomProvider>
      <CurrentLayout
        separateFramesView={separateFramesView}
      />
    </ZoomProvider>
  ) 
}

export default observer(Layout)
