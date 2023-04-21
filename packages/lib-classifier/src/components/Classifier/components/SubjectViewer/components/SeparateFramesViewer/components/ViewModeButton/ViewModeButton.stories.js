import { Provider } from 'mobx-react'
import mockStore from '@test/mockStore'

import ViewModeButton from './ViewModeButton'

export default {
  title: 'Subject Viewers / SeparateFramesViewer / ViewModeButton',
  component: ViewModeButton
}

const storeWithSeparateFramesView = mockStore()
storeWithSeparateFramesView.subjectViewer.setSeparateFramesView(true)

export const SwitchToFlipbook = () => {
  return (
    <Provider classifierStore={storeWithSeparateFramesView}>
      <ViewModeButton />
    </Provider>
  )
}

const storeWithFlipbookViewMode = mockStore()
storeWithFlipbookViewMode.subjectViewer.setSeparateFramesView(false)

export const SwitchToSeparateFrames = () => {
  return (
    <Provider classifierStore={storeWithFlipbookViewMode}>
      <ViewModeButton />
    </Provider>
  )
}
