function getDrawingModeUpdates(activeToolType, isMeasureModeActive) {
  const isDrawing = activeToolType === 'LineString' && !isMeasureModeActive

  if (isDrawing) {
    return {
      lineStringDraw: true,
      featureInteractions: 'disable',
      clearSelection: true
    }
  }

  return {
    lineStringDraw: false,
    featureInteractions: isMeasureModeActive ? 'skip' : 'enable',
    clearSelection: false
  }
}

export default getDrawingModeUpdates
