import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

import { useStores } from '@hooks'
import ResetButton from './ResetButton'

function storeMapper(classifierStore) {
  const {
    flipbookViewMode,
    resetView
  } = classifierStore.subjectViewer
  const separateFramesView = flipbookViewMode === 'separate'

  return {
    resetView,
    separateFramesView
  }
}

function ResetButtonContainer({ separateFrameResetView = () => true }) {
  const { separateFramesView, resetView } = useStores(storeMapper)

  return (
    <ResetButton
      onClick={separateFramesView ? separateFrameResetView : resetView}
    />
  )
}

export default observer(ResetButtonContainer)

ResetButton.propTypes = {
  /** Used when separate frames of a subject each have their own ImageToolbar */
  separateFrameResetView: PropTypes.func
}
