import { withStores } from '@helpers'
import ImageAndTextViewerContainer from './ImageAndTextViewerContainer'

function storeMapper (store) {
  const {
    subjects: {
      active: subject
    },
    subjectViewer: {
      enableRotation,
      frame,
      move,
      rotation,
      setFrame,
      setOnZoom,
      setOnPan
    }
  } = store

  return {
    enableRotation,
    frame,
    move,
    rotation,
    setFrame,
    setOnZoom,
    setOnPan,
    subject
  }
}

export default withStores(ImageAndTextViewerContainer, storeMapper)
