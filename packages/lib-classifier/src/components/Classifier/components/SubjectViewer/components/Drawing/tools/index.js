import Point from './point'

const drawingTools = {
  point: Point
}

function getDrawingTool (tool) {
  return drawingTools[tool] || null
}

export default getDrawingTool
