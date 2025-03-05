import { withStores } from '@helpers'
import DataImageViewerContainer from './DataImageViewerContainer'

function storeMapper(classifierStore) {
  const {
    subjects: {
      active: subject
    },
    subjectViewer: {
      setOnPan,
      setOnZoom
    }
  } = classifierStore

  return {
    setOnPan,
    setOnZoom,
    subject
  }
}

export default withStores(DataImageViewerContainer, storeMapper)