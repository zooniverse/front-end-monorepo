import { withStores } from '@helpers'
import ResetButton from './ResetButton'

function storeMapper(classifierStore) {
  const {
    resetView
  } = classifierStore.subjectViewer

  return {
    onClick: resetView
  }
}

export default withStores(ResetButton, storeMapper)
