function getDrawModeCursor({
  isModifying = false,
  isSketching = false,
  isOnSelectedVertex = false,
  isOnAnotherFeature = false,
  isAtMaxLines = false,
  isDragging = false
} = {}) {
  if (isModifying) return 'grabbing'
  if (isSketching) return isDragging ? '' : 'crosshair'
  if (isOnSelectedVertex) return isDragging ? 'grabbing' : 'grab'
  if (isOnAnotherFeature) return 'pointer'
  if (isAtMaxLines) return isDragging ? '' : 'not-allowed'
  return isDragging ? '' : 'crosshair'
}

export default getDrawModeCursor
