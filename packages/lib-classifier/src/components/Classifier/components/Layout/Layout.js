import { observer } from 'mobx-react'

import { useStores } from '@hooks'
import getLayout from './helpers/getLayout'

function storeMapper(classifierStore) {
  const workflow = classifierStore.workflows.active
  const limitSubjectHeight = workflow?.configuration?.limit_subject_height
  const layout = limitSubjectHeight ? 'centered' : workflow?.layout
  const separateFramesView = classifierStore.subjectViewer.separateFramesView
  const hasSurveyTask = workflow?.hasSurveyTask

  return {
    layout,
    separateFramesView,
    hasSurveyTask
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
