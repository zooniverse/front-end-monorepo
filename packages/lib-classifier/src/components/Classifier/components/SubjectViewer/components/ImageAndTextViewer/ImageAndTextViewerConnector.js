import { withStores } from '@helpers'
import ImageAndTextViewerContainer from './ImageAndTextViewerContainer'

function storeMapper (store) {
  const {
    subjectViewer: {
      frame,
      setFrame
    }
  } = store

  return {
    frame,
    setFrame
  }
}

export default withStores(ImageAndTextViewerContainer, storeMapper)
