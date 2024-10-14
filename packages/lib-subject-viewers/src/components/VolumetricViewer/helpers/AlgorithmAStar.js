import { SortedSet } from './SortedSet.js'

export const AlgorithmAStar = ({
  annotation,
  point: pointOriginal,
  viewer
}) => {
  const pointValueStart = viewer.getPointValue({ point: pointOriginal })
  const traversedPoints = []
  const connectedPoints = SortedSet({ data: [pointOriginal] })
  const pointsToCheck = [pointOriginal]

  function checkConnectedPoints () {
    if (pointsToCheck.length === 0) return

    const point = pointsToCheck.shift()
    const pointValue = viewer.getPointValue({ point })
    const isPointValid =
      pointValue >= pointValueStart - annotation.threshold &&
      pointValue <= pointValueStart + annotation.threshold

    // if the point is not valid, we don't want to do anything else with it
    if (!isPointValid) return

    // point is a connected point
    connectedPoints.add({ value: point })

    // check all points around it
    const [x, y, z] = viewer.getPointCoordinates({ point })
    const pointsAdjascent = [
      [x - 1, y, z],
      [x + 1, y, z],
      [x, y - 1, z],
      [x, y + 1, z],
      [x, y, z - 1],
      [x, y, z + 1]
    ]

    for (let i = 0; i < pointsAdjascent.length; i++) {
      const pointPotential = viewer.getPointFromStructured({
        point: pointsAdjascent[i]
      })

      if (pointPotential === undefined) continue // ignore points that don't exist
      if (traversedPoints[pointPotential]) continue // ignore points already checked
      if (viewer.getPointAnnotationIndex({ point: pointPotential }) !== -1) { continue } // ignore points already annotated

      traversedPoints[pointPotential] = true
      pointsToCheck.push(pointPotential)
    }
  }

  while (pointsToCheck.length > 0) {
    checkConnectedPoints()
  }

  return connectedPoints
}
