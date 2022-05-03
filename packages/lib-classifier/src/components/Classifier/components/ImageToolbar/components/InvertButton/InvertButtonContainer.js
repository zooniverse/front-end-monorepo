import { withStores } from '@helpers'
import InvertButton from './InvertButton'

function storeMapper(classifierStore) {
  const {
    invertView
  } = classifierStore.subjectViewer

  return {
    onClick: invertView
  }
}

export default withStores(InvertButton, storeMapper)
