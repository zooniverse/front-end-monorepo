import { withStores } from '@helpers'
import NewSingleImageViewerContainer from './NewSingleImageViewerContainer'

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
    },
    workflows: {
      active: {
        configuration: {
          limit_subject_height: limitSubjectHeight
        }
      }
    }
  } = store

  return {
    enableRotation,
    frame,
    invert,
    limitSubjectHeight,
    move,
    rotation,
    setOnZoom,
    setOnPan,
    subject
  }
}

export default withStores(NewSingleImageViewerContainer, storeMapper)
