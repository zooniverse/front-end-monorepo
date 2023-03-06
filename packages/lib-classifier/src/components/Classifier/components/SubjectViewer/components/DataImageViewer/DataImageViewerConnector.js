import { withStores } from '@helpers'
import DataImageViewerContainer from './DataImageViewerContainer'

function storeMapper(classifierStore) {
  const {
    subjects: {
      active: subject
    },
    subjectViewer: {
      enableRotation,
      move,
      resetView,
      rotation,
      setOnZoom,
      setOnPan
    }
  } = classifierStore

  return {
    enableRotation,
    move,
    resetView,
    rotation,
    setOnZoom,
    setOnPan,
    subject
  }
}

export default withStores(DataImageViewerContainer, storeMapper)