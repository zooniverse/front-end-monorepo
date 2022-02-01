import { withStores } from '@helpers'
import MoveButton from './MoveButton'

function storeMapper(classifierStore) {
  const {
    move,
    enableMove
  } = classifierStore.subjectViewer

  return {
    active: move,
    onClick: enableMove
  }
}

export default withStores(MoveButton, storeMapper)
