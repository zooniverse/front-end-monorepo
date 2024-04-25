import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

import { useStores } from '@hooks'
import ResetButton from './ResetButton'

function storeMapper(classifierStore) {
  const {
    disableImageToolbar,
    resetView
  } = classifierStore.subjectViewer

  const disabled = disableImageToolbar

  return {
    disabled,
    resetView
  }
}

function ResetButtonContainer({ separateFrameResetView }) {
  const { disabled, resetView } = useStores(storeMapper)

  const resetCallback = separateFrameResetView || resetView

  return (
    <ResetButton
      disabled={disabled}
      onClick={resetCallback}
    />
  )
}

export default observer(ResetButtonContainer)

ResetButton.propTypes = {
  /** Used when separate frames of a subject each have their own ImageToolbar */
  separateFrameResetView: PropTypes.func
}
