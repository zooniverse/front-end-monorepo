function getInteractionStates({ activeToolType, isMeasureModeActive }) {
  const isDrawing = activeToolType === 'SegmentedLine' && !isMeasureModeActive

  return {
    measure: isMeasureModeActive,
    lineStringDraw: isDrawing,
    lineStringModify: isDrawing,
    select: !isMeasureModeActive,
    translate: !isMeasureModeActive && !isDrawing,
    modifyUncertainty: !isMeasureModeActive && !isDrawing,
    moveToClick: !isMeasureModeActive && !isDrawing
  }
}

export default getInteractionStates
