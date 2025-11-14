import DataImageViewer from '../../components/DataImageViewer'
import FlipbookViewer from '../../components/FlipbookViewer'
import GeoMapViewer from '../../components/GeoMapViewer'
import JSONDataViewer from '../../components/JSONDataViewer'
import ImageAndTextViewer from '../../components/ImageAndTextViewer'
import MultiFrameViewer from '../../components/MultiFrameViewer'
import SingleImageViewer from '../../components/SingleImageViewer'
import SingleTextViewer from '../../components/SingleTextViewer'
import SingleVideoViewer from '../../components/SingleVideoViewer'
import SubjectGroupViewer from '../../components/SubjectGroupViewer'
import VolumetricViewer from '../../components/VolumetricViewer/VolumetricViewerWrapper'

const viewers = {
  dataImage: DataImageViewer,
  flipbook: FlipbookViewer,
  geoMap: GeoMapViewer,
  jsonData: JSONDataViewer,
  imageAndText: ImageAndTextViewer,
  lightCurve: JSONDataViewer,
  multiFrame: MultiFrameViewer,
  scatterPlot: JSONDataViewer,
  singleImage: SingleImageViewer,
  singleText: SingleTextViewer,
  singleVideo: SingleVideoViewer,
  subjectGroup: SubjectGroupViewer,
  variableStar: JSONDataViewer,
  volumetric: VolumetricViewer
}

function getViewer (viewer) {
  return viewers[viewer] || null
}

export default getViewer
