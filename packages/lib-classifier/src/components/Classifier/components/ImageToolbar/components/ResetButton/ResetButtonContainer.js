import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

import { useStores } from '@hooks'
import ResetButton from './ResetButton'

function storeMapper(classifierStore) {
  const {
    disableImageToolbar,
    resetView,
    separateFramesView
  } = classifierStore.subjectViewer

  const disabled = disableImageToolbar

  return {
    disabled,
    resetView,
    separateFramesView
  }
}

function ResetButtonContainer({ separateFrameResetView = () => true }) {
  const {
    disabled,
    resetView,
    separateFramesView
  } = useStores(storeMapper)

  return (
    <ResetButton
      disabled={disabled}
      onClick={separateFramesView ? separateFrameResetView : resetView}
    />
  )
}

export default observer(ResetButtonContainer)

ResetButton.propTypes = {
  /** Used when separate frames of a subject each have their own ImageToolbar */
  separateFrameResetView: PropTypes.func
}
