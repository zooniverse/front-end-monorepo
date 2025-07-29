import { observer } from 'mobx-react'
import { useStores } from '@hooks'

import FlipbookControls from './FlipbookControls'

function storeMapper(store) {
  const {
    flipbookSpeed,
    setFlipbookSpeed
  } = store.subjectViewer

  const {
    enable_switching_flipbook_and_separate: enableSwitchView
  } = store.workflows?.active?.configuration

  return {
    enableSwitchView,
    flipbookSpeed,
    setFlipbookSpeed
  }
}

function FlipbookControlsConnector(props) {
  const {
    enableSwitchView,
    flipbookSpeed,
    setFlipbookSpeed
  } = useStores(storeMapper)

  return (
    <FlipbookControls
      enableSwitchView={enableSwitchView}
      flipbookSpeed={flipbookSpeed}
      setFlipbookSpeed={setFlipbookSpeed}
      {...props}
    />
  )
}

export default observer(FlipbookControlsConnector)
