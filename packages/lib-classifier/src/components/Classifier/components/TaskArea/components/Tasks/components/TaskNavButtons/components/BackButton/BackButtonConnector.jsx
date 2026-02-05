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

      requestAnimationFrame(() => {
        const taskArea = document.querySelector('[data-testid="task-area"]')
        taskArea?.focus()
        if (taskArea?.getBoundingClientRect().top < 0) {
          taskArea.scrollIntoView({ block: 'start' })
        }
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
