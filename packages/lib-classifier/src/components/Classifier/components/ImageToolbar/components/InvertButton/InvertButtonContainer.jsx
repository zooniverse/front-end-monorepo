import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

import { useStores } from '@hooks'
import InvertButton from './InvertButton'

function storeMapper (classifierStore) {
  const {
    subjectViewer: {
      disableInvertButton,
      invert,
      invertView
    },
    workflows: {
      active: workflow
    }
  } = classifierStore

  const active = invert
  const show = workflow?.configuration?.invert_subject
  const disabled = disableInvertButton

  return {
    active,
    disabled,
    invertView,
    show
  }
}

function InvertButtonContainer ({ separateFrameInvert }) {
  const {
    active,
    disabled,
    invertView,
    show
  } = useStores(storeMapper)

  const invertCallback = separateFrameInvert || invertView

  if (!show) {
    return null
  }

  return (
    <InvertButton
      active={active}
      disabled={disabled}
      onClick={invertCallback}
    />
  )
}

export default observer(InvertButtonContainer)

InvertButtonContainer.propTypes = {
  /** Used when separate frames of a subject each have their own ImageToolbar */
  separateFrameInvert: PropTypes.func
}
