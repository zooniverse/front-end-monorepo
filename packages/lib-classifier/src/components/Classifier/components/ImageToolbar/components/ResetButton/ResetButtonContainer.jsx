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

function ResetButtonContainer({ overrideDisabled, separateFrameResetView }) {
  const { disabled, resetView } = useStores(storeMapper)

  const resetCallback = separateFrameResetView || resetView
  const _disabled = overrideDisabled ?? disabled

  return (
    <ResetButton
      disabled={_disabled}
      onClick={resetCallback}
    />
  )
}

export default observer(ResetButtonContainer)

ResetButton.propTypes = {
  /** Overrides the 'disabled' value, which is usually determined by the Subject Viewer Store's disableImageToolbar */
  overrideDisabled: PropTypes.bool,
  /** Used when separate frames of a subject each have their own ImageToolbar */
  separateFrameResetView: PropTypes.func
}
