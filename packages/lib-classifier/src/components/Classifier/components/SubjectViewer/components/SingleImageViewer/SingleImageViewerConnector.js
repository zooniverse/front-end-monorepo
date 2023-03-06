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
    display_natural_subject_dimensions: displayNaturalDimensions
  } = store.workflows?.active?.configuration

  return {
    displayNaturalDimensions,
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
