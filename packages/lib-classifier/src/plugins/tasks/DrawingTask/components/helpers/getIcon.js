import AnchoredEllipse from '../components/AnchoredEllipse'
import Bezier from '../components/Bezier'
import Circle from '../components/Circle'
import Column from '../components/Column'
import Ellipse from '../components/Ellipse'
import Fan from '../components/Fan'
import FreehandLine from '../components/FreehandLine'
import FreehandSegmentLine from '../components/FreehandSegmentLine'
import FreehandSegmentShape from '../components/FreehandSegmentShape'
import FreehandShape from '../components/FreehandShape'
import FullHeightLine from '../components/FullHeightLine'
import FullWidthLine from '../components/FullWidthLine'
import Grid from '../components/Grid'
import Line from '../components/Line'
import Point from '../components/Point'
import PointGrid from '../components/PointGrid'
import Polygon from '../components/Polygon'
import Rectangle from '../components/Rectangle'
import RotateRectangle from '../components/RotateRectangle'
import Triangle from '../components/Triangle'

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
  triangle: Triangle
}

function getIcon (icon) {
  return icons[icon] || null
}

export default getIcon
