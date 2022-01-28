import { withStores } from '@helpers'
import TaskArea from './TaskArea'

function storeMapper(store) {
  const {
    subjects: {
      active: subject
    },
    tutorials: {
      setSeenTime
    },
    workflows: {
      active: workflow
    }
  } = store

  return {
    alreadySeen: subject?.alreadySeen,
    retired: subject?.retired,
    setSeenTime,
    subject,
    tutorial: workflow?.tutorial,
    workflow
  }
}

export default withStores(TaskArea, storeMapper)
