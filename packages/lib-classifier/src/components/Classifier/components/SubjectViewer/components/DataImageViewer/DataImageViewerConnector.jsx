import { withStores } from '@helpers'
import DataImageViewerContainer from './DataImageViewerContainer'

function storeMapper(classifierStore) {
  const {
    subjects: {
      active: subject
    },
    subjectViewer: {
      resetView,
      setOnPan,
      setOnZoom
    }
  } = classifierStore

  return {
    resetView,
    setOnPan,
    setOnZoom,
    subject
  }
}

export default withStores(DataImageViewerContainer, storeMapper)