import { scaleLinear } from '@vx/scale'

export default function scaleTransform (dataExtent, transformMatrix, xRange, yRange) {
  console.log(dataExtent, transformMatrix, xRange, yRange)
  const xScale = scaleLinear({
    domain: dataExtent.x,
    range: xRange
  })

  const yScale = scaleLinear({
    domain: dataExtent.y,
    range: yRange
  })

  return {
    xScale: scaleLinear({
      domain: [
        xScale.invert((xScale(dataExtent.x[0]) - transformMatrix.translateX) / transformMatrix.scaleX),
        xScale.invert((xScale(dataExtent.x[1]) - transformMatrix.translateX) / transformMatrix.scaleX)
      ],
      range: xRange
    }),
    yScale: scaleLinear({
      domain: [
        yScale.invert((yScale(dataExtent.y[0]) - transformMatrix.translateY) / transformMatrix.scaleY),
        yScale.invert((yScale(dataExtent.y[1]) - transformMatrix.translateY) / transformMatrix.scaleY)
      ],
      range: yRange,
    })
  }
}