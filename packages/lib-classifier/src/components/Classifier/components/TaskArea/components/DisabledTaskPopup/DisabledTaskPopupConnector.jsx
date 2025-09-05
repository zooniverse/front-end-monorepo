import { withStores } from '@helpers'
import DisabledTaskPopup from './DisabledTaskPopup'

function storeMapper(store) {
  const {
    subjects: {
      nextAvailable,
      clearQueue
    }
  } = store

  return {
    nextAvailable,
    reset: clearQueue
  }
}

export default withStores(DisabledTaskPopup, storeMapper)
