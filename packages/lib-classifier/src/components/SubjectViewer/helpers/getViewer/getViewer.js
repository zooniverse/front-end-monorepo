import { default as SingleImageViewer } from '../../components/SingleImageViewer'
import { default as LightCurveViewer } from '../../components/LightCurveViewer'

const viewers = {
  singleImage: SingleImageViewer,
  lightCurve: LightCurveViewer
}

function getViewer (viewer) {
  return viewers[viewer] || null
}

export default getViewer
