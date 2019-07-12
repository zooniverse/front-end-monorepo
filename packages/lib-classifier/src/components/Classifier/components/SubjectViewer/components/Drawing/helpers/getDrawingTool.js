import Point from '../tools/Point'

const drawingTools = {
  point: Point
}

function getDrawingTool (tool) {
  return drawingTools[tool] || null
}

export default getDrawingTool
