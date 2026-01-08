import { withStores } from '@helpers'
import GeoMapViewerContainer from './GeoMapViewerContainer'

function storeMapper (store) {
  const {
    subjects: {
      active: subject
    },
    subjectViewer: {
      loadingState
    }
  } = store

  const latest = subject?.stepHistory.latest

  return {
    latest,
    loadingState,
    subject
  }
}

export default withStores(GeoMapViewerContainer, storeMapper)
