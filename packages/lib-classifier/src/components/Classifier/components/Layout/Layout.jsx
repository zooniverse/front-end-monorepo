import { observer } from 'mobx-react'

import { useStores } from '@hooks'
import getLayout from './helpers/getLayout'

function storeMapper(classifierStore) {
  const workflow = classifierStore.workflows.active
  const hasSurveyTask = workflow?.hasSurveyTask
  const separateFramesView = classifierStore.subjectViewer.separateFramesView

  const layout = (classifierStore.projects?.active?.isVolumetricViewer)
    ? 'volumetric'
    : workflow?.layout
  
  return {
    hasSurveyTask,
    layout,
    separateFramesView
  }
}

function Layout() {
  const {
    layout,
    separateFramesView,
    hasSurveyTask
  } = useStores(storeMapper)

  // `getLayout()` will always return the default layout as a fallback
  const CurrentLayout = getLayout(layout)
  
  return (
    <CurrentLayout
      separateFramesView={separateFramesView}
      hasSurveyTask={hasSurveyTask}
    />
  )
}

export default observer(Layout)
