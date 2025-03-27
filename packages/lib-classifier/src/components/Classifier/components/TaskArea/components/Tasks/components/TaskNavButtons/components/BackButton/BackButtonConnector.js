import { observer } from 'mobx-react'

import { useStores } from '@hooks'
import BackButton from './BackButton'

function storeMapper(classifierStore) {
  const {
    subjects: { active: subject }
  } = classifierStore

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
}

function BackButtonConnector(props) {
  const { canUndo, onClick } = useStores(storeMapper)

  return canUndo ? <BackButton onClick={onClick} {...props} /> : null
}

export default observer(BackButtonConnector)
