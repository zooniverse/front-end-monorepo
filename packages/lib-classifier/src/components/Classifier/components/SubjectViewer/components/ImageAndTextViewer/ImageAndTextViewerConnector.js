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
      setFrame
    }
  } = store

  return {
    dimensions,
    frame,
    loadingState,
    setFrame,
    subject
  }
}

export default withStores(ImageAndTextViewerContainer, storeMapper)
