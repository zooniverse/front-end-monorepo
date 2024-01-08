import { withStores } from '@helpers'

import BackButton from './BackButton'

function storeMapper(store) {
  const {
    subjects: {
      active: subject
    }
  } = store

  if (subject?.stepHistory) {
    const { back, canUndo } = subject?.stepHistory

    function onClick() {
      back()
    }

    return {
      canUndo,
      onClick
    }
  }

  return {}
}

export default withStores(BackButton, storeMapper)
