function getInteractionStates({ activeToolType, isMeasureModeActive, canCreatePoints = false }) {
  const isDrawing = activeToolType === 'SegmentedLine' && !isMeasureModeActive
  const isPointDrawing = activeToolType === 'Point' && canCreatePoints && !isMeasureModeActive

  return {
    measure: isMeasureModeActive,
    lineStringDraw: isDrawing,
    lineStringModify: isDrawing,
    pointDraw: isPointDrawing,
    select: !isMeasureModeActive,
    translate: !isMeasureModeActive && !isDrawing,
    modifyUncertainty: !isMeasureModeActive && !isDrawing,
    moveToClick: !isMeasureModeActive && !isDrawing
  }
}

export default getInteractionStates
