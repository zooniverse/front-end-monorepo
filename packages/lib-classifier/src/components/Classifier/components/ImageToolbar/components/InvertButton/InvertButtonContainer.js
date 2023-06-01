import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

import { useStores } from '@hooks'
import InvertButton from './InvertButton'

function storeMapper (classifierStore) {
  const {
    subjectViewer: {
      disableImageToolbar,
      invert,
      invertView,
      separateFramesView
    },
    workflows: {
      active: workflow
    }
  } = classifierStore

  const active = invert
  const show = workflow?.configuration?.invert_subject
  const disabled = disableImageToolbar

  return {
    active,
    disabled,
    invertView,
    separateFramesView,
    show
  }
}

function InvertButtonContainer ({
  separateFrameInvert
}) {
  const {
    active,
    disabled,
    invertView,
    separateFramesView,
    show
  } = useStores(storeMapper)

  if (!show) {
    return null
  }

  return (
    <InvertButton
      active={active}
      disabled={disabled}
      onClick={separateFramesView ? separateFrameInvert : invertView}
    />
  )
}

export default observer(InvertButtonContainer)

InvertButtonContainer.propTypes = {
  /** Used when separate frames of a subject each have their own ImageToolbar */
  separateFrameInvert: PropTypes.func
}
