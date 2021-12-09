import { withStores } from '@helpers'

import BackButton from './BackButton'

function storeMapper(store) {
  const {
    subjects: {
      active: subject
    },
    workflows: {
      active: {
        configuration: {
          persist_annotations: persistAnnotations
        }
      }
    }
  } = store

  if (subject?.stepHistory) {
    const { back, canUndo } = subject?.stepHistory

    function onClick() {
      back(persistAnnotations)
    }

    return {
      canUndo,
      onClick,
      persistAnnotations
    }
  }

  return {}

}

export default withStores(BackButton, storeMapper)
