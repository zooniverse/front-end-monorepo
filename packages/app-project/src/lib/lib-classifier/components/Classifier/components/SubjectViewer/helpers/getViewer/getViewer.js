import SingleImageViewer from '../../components/SingleImageViewer'
import LightCurveViewer from '../../components/LightCurveViewer'

const viewers = {
  singleImage: SingleImageViewer,
  lightCurve: LightCurveViewer
}

function getViewer (viewer) {
  return viewers[viewer] || null
}

export default getViewer
