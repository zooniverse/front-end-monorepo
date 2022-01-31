function roundCoordinates({ x, y }) {
  console.log('from helper: ', x)
  console.log('from helper: ', y)
  const roundedX = +(Math.round(x + 'e+2') + 'e-2')
  const roundedY = +(Math.round(y + 'e+2') + 'e-2')
  return { roundedX, roundedY }
}

export default roundCoordinates
