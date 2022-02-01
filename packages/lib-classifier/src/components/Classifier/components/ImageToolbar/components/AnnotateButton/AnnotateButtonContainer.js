import { withStores } from '@helpers'
import AnnotateButton from './AnnotateButton'

function storeMapper (classifierStore) {
  const {
    annotate,
    enableAnnotate
  } = classifierStore.subjectViewer

  return {
    active: annotate,
    onClick: enableAnnotate
  }
}

export default withStores(AnnotateButton, storeMapper)
