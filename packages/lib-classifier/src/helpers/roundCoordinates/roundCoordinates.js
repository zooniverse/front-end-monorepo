function roundCoordinates({ x, y }) {
  const roundedX = +(Math.round(x + 'e+2') + 'e-2')
  const roundedY = +(Math.round(y + 'e+2') + 'e-2')
  return { roundedX, roundedY }
}

export default roundCoordinates
