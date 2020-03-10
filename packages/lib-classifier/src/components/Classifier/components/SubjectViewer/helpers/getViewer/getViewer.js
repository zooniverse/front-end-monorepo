import SubjectGroupViewer from '../../components/SubjectGroupViewer'
import SingleImageViewer from '../../components/SingleImageViewer'
import LightCurveViewer from '../../components/LightCurveViewer'
import MultiFrameViewer from '../../components/MultiFrameViewer'
import VariableStarViewer from '../../components/VariableStarViewer'

const viewers = {
  subjectGroup: SubjectGroupViewer,
  singleImage: SingleImageViewer,
  lightCurve: LightCurveViewer,
  multiFrame: MultiFrameViewer,
  variableStar: VariableStarViewer,
}

function getViewer (viewer) {
  return viewers[viewer] || null
}

export default getViewer
