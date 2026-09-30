import { observer } from 'mobx-react'

import { useStores } from '@hooks'
import getLayout from './helpers/getLayout'

function storeMapper(classifierStore) {
  const workflow = classifierStore.workflows.active
  const hasSurveyTask = workflow?.hasSurveyTask
  const separateFramesViewConfig = classifierStore.subjectViewer.separateFramesView
  const subject = classifierStore.subjects.active

  // This is a patch for one project https://www.zooniverse.org/projects/newberry/newberry-image-tag
  // Their subject sets have a mix of subjects with one frame and subjects with multiple frames.
  // Do not use the separate frames layout adjustments if there's only one frame.
  // This strategy could be refactored if the ImageToolbar is imported into each subject viewer rather than the CurrentLayout component.
  const separateFramesView = subject?.locations.length > 1 ? separateFramesViewConfig : false

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
