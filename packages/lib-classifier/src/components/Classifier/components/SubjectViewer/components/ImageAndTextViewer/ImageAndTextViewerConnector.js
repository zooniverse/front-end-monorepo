import { withStores } from '@helpers'
import ImageAndTextViewerContainer from './ImageAndTextViewerContainer'

function storeMapper (store) {
  const {
    subjects: {
      active: subject
    },
    subjectViewer: {
      frame,
      setFrame
    }
  } = store

  return {
    frame,
    setFrame,
    subject
  }
}

export default withStores(ImageAndTextViewerContainer, storeMapper)
