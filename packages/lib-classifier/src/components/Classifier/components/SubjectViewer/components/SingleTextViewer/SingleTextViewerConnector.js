import { withStores } from '@helpers'
import SingleTextViewerContainer from './SingleTextViewerContainer'

function storeMapper (store) {
  const {
    subjects: {
      active: subject
    }
  } = store

  return {
    subject
  }
}

export default withStores(SingleTextViewerContainer, storeMapper)
