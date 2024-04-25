import { withStores } from '@helpers'
import ImageAndTextViewerContainer from './ImageAndTextViewerContainer'

function storeMapper (store) {
  const {
    subjects: {
      active: subject
    },
    subjectViewer: {
      dimensions,
      enableRotation,
      frame,
      loadingState,
      setFrame
    }
  } = store

  return {
    dimensions,
    enableRotation,
    frame,
    loadingState,
    setFrame,
    subject
  }
}

export default withStores(ImageAndTextViewerContainer, storeMapper)
