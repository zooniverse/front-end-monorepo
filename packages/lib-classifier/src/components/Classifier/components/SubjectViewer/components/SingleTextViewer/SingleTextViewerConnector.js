import { withStores } from '@helpers'
import SingleTextViewerContainer from './SingleTextViewerContainer'

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

export default withStores(SingleTextViewerContainer, storeMapper)
