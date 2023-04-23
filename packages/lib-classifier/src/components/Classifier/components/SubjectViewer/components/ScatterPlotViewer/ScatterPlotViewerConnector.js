import { withStores } from '@helpers'
import ScatterPlotViewerContainer from './ScatterPlotViewerContainer'

function storeMapper(classifierStore) {
  const {
    subjects: {
      active: subject
    },
    subjectViewer: {
      interactionMode,
      setOnZoom,
      setOnPan
    }
  } = classifierStore

  return {
    interactionMode,
    setOnZoom,
    setOnPan,
    subject
  }
}

export default withStores(ScatterPlotViewerContainer, storeMapper)
