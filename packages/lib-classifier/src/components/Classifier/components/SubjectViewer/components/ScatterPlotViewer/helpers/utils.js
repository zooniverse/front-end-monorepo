import { scaleLinear } from '@visx/scale'
import { extent } from 'd3-array'
import { flatten, zipWith } from 'lodash'

function isThisMultipleDataSeries (data) {
  return Array.isArray(data)
}

export function getDataPoints (data) {
  if (isThisMultipleDataSeries(data)) {
    return data
  } else {
    return [
      { seriesData: zipWith(data.x, data.y,
        function (a, b) {
          return { x: a, y: b }
        }) 
      }
    ]
  }
}

/*
Gets the minimum & maximum X & Y values for a data series.

- Input:
  - data: data series OR multiple data series with x & y values, e.g.
    - dataExample1 = { x: [1, 2... 9], y: [1, 4... 81] }
    - dataExample2 = [{ seriesData: [{x:1,y:1}, {x:2,y:4}, ... {x:9,y:81}] }]
  - bufferPercentage: adds a buffer to the minimum and maximum values.
    - A buffer is useful when presenting data on a chart, so the data points at
      the actual max/min values don't "stick" to the edge of the chart.
- Output: object with 2 arrays with 2x items, e.g. { x: [1, 9], y: [1, 81] }

WARNING: will completely bork if data contains 0 points.
 */
export function getDataExtent (data, bufferPercentage = 0) {
  let extentX = []  // minX, and maxX.
  let extentY = []  // minY, and maxY.

  if (isThisMultipleDataSeries(data)) {
    const xValues = flatten(data.map((series) => {
      return series.seriesData.map((dataItem) => {
        return dataItem.x
      })
    }))
    const yValues = flatten(data.map((series) => {
      return series.seriesData.map((dataItem) => {
        return dataItem.y
      })
    }))
    extentX = extent(xValues)
    extentY = extent(yValues)
  } else {
    extentX = data.x
    extentY = data.y
  }

  // Increase the maximum, and decrease the minimum, by a certain buffer value.
  if (bufferPercentage > 0 && extentX.length >= 2 && extentY.length >= 2) {
    const bufferX = Math.abs(extentX[1] - extentX[0]) * bufferPercentage
    const bufferY = Math.abs(extentY[1] - extentY[0]) * bufferPercentage
    extentX = [ extentX[0] - bufferX, extentX[1] + bufferX ]
    extentY = [ extentY[0] - bufferY, extentY[1] + bufferY ]
  }

  return {
    x: extentX,
    y: extentY,
  }
}

export function left (tickDirection, margin) {
  const left = {
    inner: 0,
    outer: margin.left
  }

  return left[tickDirection]
}

export function top (tickDirection, margin) {
  const top = {
    inner: 0,
    outer: margin.top
  }

  return top[tickDirection]
}

export function xMin ({ tickDirection, padding }) {
  const xMin = {
    inner: padding.left,
    outer: 0
  }

  return xMin[tickDirection]
}

export function xMax ({ tickDirection, parentWidth, margin }) {
  const xMax = {
    inner: parentWidth - margin.left,
    outer: parentWidth - margin.left - margin.right
  }

  return xMax[tickDirection]
}

export function yMin ({ tickDirection, padding }) {
  const yMin = {
    inner: padding.bottom,
    outer: 0
  }

  return yMin[tickDirection]
}

export function yMax ({ tickDirection, parentHeight, margin, padding }) {
  const yMax = {
    inner: parentHeight - padding.bottom,
    outer: parentHeight - margin.top - margin.bottom
  }

  return yMax[tickDirection]
}

export function transformXScale (data, transformMatrix, rangeParameters, bufferPercentage) {
  const dataExtent = getDataExtent(data, bufferPercentage)
  const xRange = (rangeParameters.invertAxes.x) ?
    [xMax(rangeParameters), xMin(rangeParameters)] :
    [xMin(rangeParameters), xMax(rangeParameters)]

  const xScale = scaleLinear({
    domain: dataExtent.x,
    range: xRange
  })

  return scaleLinear({
    domain: [
      xScale.invert((xScale(dataExtent.x[0]) - transformMatrix.translateX) / transformMatrix.scaleX),
      xScale.invert((xScale(dataExtent.x[1]) - transformMatrix.translateX) / transformMatrix.scaleX)
    ],
    range: xRange
  })
}

export function transformYScale (data, transformMatrix, rangeParameters, bufferPercentage) {
  const dataExtent = getDataExtent(data, bufferPercentage)
  const yRange = (rangeParameters.invertAxes.y) ?
    [yMin(rangeParameters), yMax(rangeParameters)] :
    [yMax(rangeParameters), yMin(rangeParameters)]

  const yScale = scaleLinear({
    domain: dataExtent.y,
    range: yRange
  })

  return scaleLinear({
    domain: [
      yScale.invert((yScale(dataExtent.y[0]) - transformMatrix.translateY) / transformMatrix.scaleY),
      yScale.invert((yScale(dataExtent.y[1]) - transformMatrix.translateY) / transformMatrix.scaleY)
    ],
    range: yRange
  })
}
