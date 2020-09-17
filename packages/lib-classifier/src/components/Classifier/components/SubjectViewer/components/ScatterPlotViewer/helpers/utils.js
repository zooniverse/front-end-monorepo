import { scaleLinear } from '@vx/scale'
import * as d3 from 'd3'
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

export function getDataExtent (data) {
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

    return {
      x: d3.extent(xValues),
      y: d3.extent(yValues)
    }
  } else {
    return {
      x: d3.extent(data.x),
      y: d3.extent(data.y)
    }
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

export function transformXScale (data, transformMatrix, rangeParameters) {
  const dataExtent = getDataExtent(data)
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
  }).nice()
}

export function transformYScale (data, transformMatrix, rangeParameters) {
  const dataExtent = getDataExtent(data)
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
  }).nice()
}
