function getDrawModeCursor({
  isModifying = false,
  isSketching = false,
  isOnSelectedVertex = false,
  isOnAnotherFeature = false,
  isDragging = false
} = {}) {
  if (isModifying) return 'grabbing'
  if (isSketching) return isDragging ? '' : 'crosshair'
  if (isOnSelectedVertex) return isDragging ? 'grabbing' : 'grab'
  if (isOnAnotherFeature) return 'pointer'
  return isDragging ? '' : 'crosshair'
}

export default getDrawModeCursor
