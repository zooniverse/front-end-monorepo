import Line from '../tools/Line'
import Point from '../tools/Point'

const drawingTools = {
  line: Line,
  point: Point
}

function getDrawingTool (tool) {
  return drawingTools[tool] || null
}

export default getDrawingTool
