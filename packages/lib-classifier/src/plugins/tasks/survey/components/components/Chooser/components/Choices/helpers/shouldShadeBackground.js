export default function shouldShadeBackground({
  index = 0,
  rowsCount = 1
}) {
  const rowIndex = index % rowsCount
  return rowIndex % 2 === 0
}
