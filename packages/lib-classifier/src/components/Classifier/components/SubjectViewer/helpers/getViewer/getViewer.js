import DataImageViewer from '../../components/DataImageViewer'
import ImageAndTextViewer from '../../components/ImageAndTextViewer'
import LightCurveViewer from '../../components/LightCurveViewer'
import MultiFrameViewer from '../../components/MultiFrameViewer'
import ScatterPlotViewer from '../../components/ScatterPlotViewer'
import SingleImageViewer from '../../components/SingleImageViewer'
import SingleTextViewer from '../../components/SingleTextViewer'
import SingleVideoViewer from '../../components/SingleVideoViewer'
import SubjectGroupViewer from '../../components/SubjectGroupViewer'
import VariableStarViewer from '../../components/VariableStarViewer'

const viewers = {
  dataImage: DataImageViewer,
  imageAndText: ImageAndTextViewer,
  lightCurve: LightCurveViewer,
  multiFrame: MultiFrameViewer,
  scatterPlot: ScatterPlotViewer,
  singleImage: SingleImageViewer,
  singleText: SingleTextViewer,
  singleVideo: SingleVideoViewer,
  subjectGroup: SubjectGroupViewer,
  variableStar: VariableStarViewer
}

function getViewer (viewer) {
  return viewers[viewer] || null
}

export default getViewer
