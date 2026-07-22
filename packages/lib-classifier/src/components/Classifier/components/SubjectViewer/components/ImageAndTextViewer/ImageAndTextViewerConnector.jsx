import { withStores } from '@helpers'
import ImageAndTextViewerContainer from './ImageAndTextViewerContainer'

function storeMapper (store) {
  const {
    subjects: {
      active: subject
    },
    subjectViewer: {
      dimensions,
      frame,
      loadingState,
      separateFramesView,
      setFrame
    }
  } = store

  const {
    enable_switching_flipbook_and_separate: enableSwitchView
  } = store.workflows?.active?.configuration

  return {
    dimensions,
    enableSwitchView,
    frame,
    loadingState,
    separateFramesView,
    setFrame,
    subject
  }
}

export default withStores(ImageAndTextViewerContainer, storeMapper)
