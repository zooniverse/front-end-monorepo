import { withStores } from '@helpers'
import SingleImageViewerContainer from './SingleImageViewerContainer'

function storeMapper(store) {
  const {
    subjects: {
      active: subject
    },
    subjectViewer: {
      enableRotation,
      frame,
      invert,
      move,
      rotation,
      setOnZoom,
      setOnPan
    }
  } = store

  const {
    limit_subject_height: limitSubjectHeight
  } = store.workflows?.active?.configuration

  return {
    limitSubjectHeight,
    enableRotation,
    frame,
    invert,
    move,
    rotation,
    setOnZoom,
    setOnPan,
    subject
  }
}

export default withStores(SingleImageViewerContainer, storeMapper)
