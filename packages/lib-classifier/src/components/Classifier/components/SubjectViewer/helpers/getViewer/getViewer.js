import DataImageViewer from '../../components/DataImageViewer'
import LightCurveViewer from '../../components/LightCurveViewer'
import MultiFrameViewer from '../../components/MultiFrameViewer'
import ScatterPlotViewer from '../../components/ScatterPlotViewer'
import SingleImageViewer from '../../components/SingleImageViewer'
import SingleVideoViewer from '../../components/SingleVideoViewer'
import SubjectGroupViewer from '../../components/SubjectGroupViewer'
import VariableStarViewer from '../../components/VariableStarViewer'

const viewers = {
  dataImage: DataImageViewer,
  subjectGroup: SubjectGroupViewer,
  singleImage: SingleImageViewer,
  scatterPlot: ScatterPlotViewer,
  singleVideo: SingleVideoViewer,
  lightCurve: LightCurveViewer,
  multiFrame: MultiFrameViewer,
  variableStar: VariableStarViewer,
}

function getViewer (viewer) {
  return viewers[viewer] || null
}

export default getViewer
