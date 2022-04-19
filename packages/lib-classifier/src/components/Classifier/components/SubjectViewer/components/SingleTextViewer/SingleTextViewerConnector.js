import { withStores } from '@helpers'
import SingleTextViewerContainer from './SingleTextViewerContainer'

function storeMapper (store) {
  const {
    subjects: {
      active: subject
    }
  } = store

  const { content, contentLoadingState, error } = subject

  return {
    content,
    contentLoadingState,
    error
  }
}

export default withStores(SingleTextViewerContainer, storeMapper)
