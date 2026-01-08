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

  return {
    loadingState,
    subject
  }
}

export default withStores(GeoMapViewerContainer, storeMapper)
