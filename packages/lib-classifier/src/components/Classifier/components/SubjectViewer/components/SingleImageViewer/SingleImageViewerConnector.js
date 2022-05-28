import { withStores } from '@helpers'
import SingleImageViewerContainer from './SingleImageViewerContainer'

function storeMapper(store) {
  const {
    subjects: {
      active: subject
    },
    subjectViewer: {
      enableRotation,
      frame,
      move,
      rotation,
      setOnZoom,
      setOnPan
    }
  } = store

  return {
    enableRotation,
    frame,
    move,
    rotation,
    setOnZoom,
    setOnPan,
    subject
  }
}

export default withStores(SingleImageViewerContainer, storeMapper)
