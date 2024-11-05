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
      rotation
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
    subject
  }
}

export default withStores(SingleImageViewerContainer, storeMapper)
