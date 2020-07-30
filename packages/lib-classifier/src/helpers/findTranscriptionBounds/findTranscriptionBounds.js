export default function findTranscriptionBounds(mark) {
  const { x1, x2, y1, y2 } = mark
  return {
    x: x1,
    y: y1,
    width: Math.abs(y1 - y2),
    height: Math.abs(y1 - y2),
    top: Math.min(y1, y2),
    right: Math.max(x1, x2),
    bottom: Math.max(y1, y2),
    left: Math.min(x1, x2)
  }
}
