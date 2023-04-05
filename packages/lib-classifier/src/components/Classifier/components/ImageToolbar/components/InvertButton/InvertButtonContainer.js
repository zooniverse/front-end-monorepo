import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

import { useStores } from '@hooks'
import InvertButton from './InvertButton'

function storeMapper (classifierStore) {
  const {
    subjectViewer: {
      flipbookViewMode,
      invert,
      invertView
    },
    workflows: {
      active: workflow
    }
  } = classifierStore
  const separateFramesView = flipbookViewMode === 'separate'

  const active = invert
  const disabled = !workflow?.configuration?.invert_subject
  return {
    active,
    disabled,
    invertView,
    separateFramesView
  }
}

function InvertButtonContainer ({
  separateFrameInvert
}) {
  const { active, disabled, invertView, separateFramesView } = useStores(storeMapper)

  if (disabled) {
    return null
  }

  return (
    <InvertButton
      active={active}
      onClick={separateFramesView ? separateFrameInvert : invertView}
    />
  )
}

export default observer(InvertButtonContainer)

InvertButtonContainer.propTypes = {
  /** Used when separate frames of a subject each have their own ImageToolbar */
  separateFrameInvert: PropTypes.func
}
