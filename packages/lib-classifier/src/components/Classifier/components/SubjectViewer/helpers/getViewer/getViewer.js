import SingleImageViewer from '../../components/SingleImageViewer'
import LightCurveViewer from '../../components/LightCurveViewer'
import MultiFrameViewer from '../../components/MultiFrameViewer'


const viewers = {
  singleImage: SingleImageViewer,
  lightCurve: LightCurveViewer,
  multiFrame: MultiFrameViewer
}

function getViewer (viewer) {
  return viewers[viewer] || null
}

export default getViewer
