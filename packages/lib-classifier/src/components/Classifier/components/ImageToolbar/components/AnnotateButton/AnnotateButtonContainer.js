import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

import { useStores } from '@hooks'
import AnnotateButton from './AnnotateButton'

function storeMapper(classifierStore) {
  const { annotate, enableAnnotate, separateFramesView } =
    classifierStore.subjectViewer

  return {
    annotate,
    enableAnnotate,
    separateFramesView
  }
}

function AnnotateButtonContainer({
  separateFrameAnnotate = false,
  separateFrameEnableAnnotate = () => true
}) {
  const { annotate, enableAnnotate, separateFramesView } =
    useStores(storeMapper)

  return (
    <AnnotateButton
      active={separateFramesView ? separateFrameAnnotate : annotate}
      onClick={
        separateFramesView ? separateFrameEnableAnnotate : enableAnnotate
      }
    />
  )
}

export default observer(AnnotateButtonContainer)

AnnotateButtonContainer.propTypes = {
  /** Used when separate frames of a subject each have their own ImageToolbar */
  separateFrameAnnotate: PropTypes.bool,
  separateFrameEnableAnnotate: PropTypes.func
}
