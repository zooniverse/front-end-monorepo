import { withStores } from '@helpers'
import SingleImageViewerContainer from './SingleImageViewerContainer'

function storeMapper(store) {
  const {
    subjects: {
      active: subject
    },
    subjectViewer: {
      enableRotation,
      move,
      rotation,
      setOnZoom,
      setOnPan
    }
  } = store

  return {
    enableRotation,
    move,
    rotation,
    setOnZoom,
    setOnPan,
    subject
  }
}

export default withStores(SingleImageViewerContainer, storeMapper)
