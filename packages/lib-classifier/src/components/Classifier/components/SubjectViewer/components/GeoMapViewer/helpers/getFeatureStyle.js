function getTool(feature, geoDrawingTask) {
  // Check for explicit toolIndex property
  const toolIndex = feature.get('toolIndex')
  if (
    toolIndex !== undefined &&
    toolIndex !== null &&
    geoDrawingTask.tools[toolIndex]
  ) {
    return geoDrawingTask.tools[toolIndex]
  }

  // Match first task tool by geometry type
  const geometryType = feature.getGeometry().getType()
  if (geoDrawingTask?.tools) {
    const matchingTool = geoDrawingTask.tools.find(tool => tool.geometryType === geometryType)
    if (matchingTool) return matchingTool
  }

  return null
}

function getFeatureStyle({
  feature,
  geoDrawingTask,
  resolution,
  isSelected = false
}) {
  if (!geoDrawingTask) return null

  const tool = getTool(feature, geoDrawingTask)

  return tool.getStyles(feature, resolution, isSelected)
}

export default getFeatureStyle
