import { observer } from 'mobx-react'

import { useStores } from '@hooks'
import BackButton from './BackButton'

function storeMapper(classifierStore) {
  const {
    subjects: { active: subject }
  } = classifierStore

  if (subject?.stepHistory) { // stepHistory is not ready while the subject is loading
    const { back, canUndo } = subject?.stepHistory

    function onClick() {
      back()

      // ensures dom update completes before scrolling back to top of Task Area
      requestAnimationFrame(() => {
        const taskArea = document.querySelector('[data-testid="task-area"]')
        taskArea?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }

    return {
      canUndo,
      onClick
    }
  }

  return {}
}

function BackButtonConnector(props) {
  const { canUndo, onClick } = useStores(storeMapper)

  return canUndo ? <BackButton onClick={onClick} {...props} /> : null
}

export default observer(BackButtonConnector)
