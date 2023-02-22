import { withStores } from '@helpers'
import ScatterPlotViewerContainer from './ScatterPlotViewerContainer'

function storeMapper(classifierStore) {
  const {
    subjects: {
      active: subject
    },
    subjectViewer: {
      setOnZoom,
      setOnPan
    }
  } = classifierStore

  return {
    setOnZoom,
    setOnPan,
    subject
  }
}

export default withStores(ScatterPlotViewerContainer, storeMapper)
