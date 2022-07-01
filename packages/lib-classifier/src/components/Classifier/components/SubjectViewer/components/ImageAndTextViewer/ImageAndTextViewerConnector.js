import { withStores } from '@helpers'
import ImageAndTextViewerContainer from './ImageAndTextViewerContainer'

function storeMapper (store) {
  const {
    subjectViewer: {
      dimensions,
      frame,
      setFrame
    }
  } = store

  return {
    dimensions,
    frame,
    setFrame
  }
}

export default withStores(ImageAndTextViewerContainer, storeMapper)
