import AnchoredEllipse from '../icons/AnchoredEllipse'
import Bezier from '../icons/Bezier'
import Circle from '../icons/Circle'
import Column from '../icons/Column'
import Ellipse from '../icons/Ellipse'
import Fan from '../icons/Fan'
import FreehandLine from '../icons/FreehandLine'
import FreehandSegmentLine from '../icons/FreehandSegmentLine'
import FreehandSegmentShape from '../icons/FreehandSegmentShape'
import FreehandShape from '../icons/FreehandShape'
import FullHeightLine from '../icons/FullHeightLine'
import FullWidthLine from '../icons/FullWidthLine'
import Grid from '../icons/Grid'
import Line from '../icons/Line'
import Point from '../icons/Point'
import PointGrid from '../icons/PointGrid'
import Polygon from '../icons/Polygon'
import Rectangle from '../icons/Rectangle'
import RotateRectangle from '../icons/RotateRectangle'
import TranscriptionLine from '../icons/TranscriptionLine'
import Triangle from '../icons/Triangle'

const icons = {
  anchoredEllipse: AnchoredEllipse,
  bezier: Bezier,
  circle: Circle,
  column: Column,
  ellipse: Ellipse,
  fan: Fan,
  freehandLine: FreehandLine,
  freehandSegmentLine: FreehandSegmentLine,
  freehandSegmentShape: FreehandSegmentShape,
  freehandShape: FreehandShape,
  fullHeightLine: FullHeightLine,
  fullWidthLine: FullWidthLine,
  grid: Grid,
  line: Line,
  point: Point,
  pointGrid: PointGrid,
  polygon: Polygon,
  rectangle: Rectangle,
  rotateRectangle: RotateRectangle,
  temporalPoint: Point,
  temporalRotateRectangle: RotateRectangle,
  transcriptionLine: TranscriptionLine,
  triangle: Triangle
}

function getIcon(icon) {
  return icons[icon] || (() => null)
}

export default getIcon
