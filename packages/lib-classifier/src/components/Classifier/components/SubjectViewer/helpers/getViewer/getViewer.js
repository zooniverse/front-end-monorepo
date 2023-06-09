import DataImageViewer from '../../components/DataImageViewer'
import FlipbookViewer from '../../components/FlipbookViewer'
import JSONDataViewer from '../../components/JSONDataViewer'
import ImageAndTextViewer from '../../components/ImageAndTextViewer'
import MultiFrameViewer from '../../components/MultiFrameViewer'
import SingleImageViewer from '../../components/SingleImageViewer'
import SingleTextViewer from '../../components/SingleTextViewer'
import SingleVideoViewer from '../../components/SingleVideoViewer'
import SubjectGroupViewer from '../../components/SubjectGroupViewer'

const viewers = {
  dataImage: DataImageViewer,
  flipbook: FlipbookViewer,
  jsonData: JSONDataViewer,
  imageAndText: ImageAndTextViewer,
  lightCurve: JSONDataViewer,
  multiFrame: MultiFrameViewer,
  scatterPlot: JSONDataViewer,
  singleImage: SingleImageViewer,
  singleText: SingleTextViewer,
  singleVideo: SingleVideoViewer,
  subjectGroup: SubjectGroupViewer,
  variableStar: JSONDataViewer
}

function getViewer (viewer) {
  return viewers[viewer] || null
}

export default getViewer
