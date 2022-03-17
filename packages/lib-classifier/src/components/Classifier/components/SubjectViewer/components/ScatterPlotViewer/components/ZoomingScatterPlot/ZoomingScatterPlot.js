import React, { Component } from 'react'
import PropTypes from 'prop-types'
import VisXZoom from '../../../SVGComponents/VisXZoom'
import {
  getDataExtent,
  left,
  transformXScale,
  transformYScale,
  top
} from '../../helpers/utils'
import { PAN_DISTANCE } from '../../helpers/constants'
import ScatterPlot from '../ScatterPlot'


const DEFAULT_ZOOM = {
  scaleX: 1,
  scaleY: 1,
  skewX: 0,
  skewY: 0,
  translateX: 0,
  translateY: 0
}

const defaultInvertAxes = {
  x: false,
  y: false
}

const defaultMargin = {
  bottom: 60,
  left: 60,
  right: 10,
  top: 10
}

const defaultPadding = {
  bottom: 0,
  left: 0,
  right: 0,
  top: 0
}

const defaultZoomConfig = {
  direction: 'both',
  minZoom: 1,
  maxZoom: 10,
  zoomInValue: 1.2,
  zoomOutValue: 0.8
}

function ZoomingScatterPlot({
  data,
  invertAxes = defaultInvertAxes,
  margin = defaultMargin,
  padding = defaultPadding,
  panning = true,
  parentHeight,
  parentWidth,
  tickDirection = 'outer',
  zoomConfiguration = defaultZoomConfig,
  zooming = true,
  ...props
}) {
  const rangeParameters = {
    invertAxes,
    margin,
    padding,
    parentHeight,
    parentWidth,
    tickDirection
  }

  function isXAxisOutOfBounds(transformMatrix) {
    const dataExtent = getDataExtent(data)
    const xScale = transformXScale(data, transformMatrix, rangeParameters)
    const xScaleDomain = xScale.domain()
    const outOfXAxisDataBounds = xScaleDomain[0] < (dataExtent.x[0] - PAN_DISTANCE) || xScaleDomain[1] > (dataExtent.x[1] + PAN_DISTANCE)

    return outOfXAxisDataBounds
  }

  function isScaleMin(scale) {
    const { minZoom } = zoomConfiguration

    return scale < minZoom
  }

  function isScaleMax(scale) {
    const { maxZoom } = zoomConfiguration

    return scale > maxZoom
  }

  function isYAxisOutOfBounds(transformMatrix) {
    const dataExtent = getDataExtent(data)
    const yScale = transformYScale(data, transformMatrix, rangeParameters)
    const yScaleDomain = yScale.domain()
    const outOfYAxisDataBounds = yScaleDomain[0] < (dataExtent.y[0] - PAN_DISTANCE) || yScaleDomain[1] > (dataExtent.y[1] + PAN_DISTANCE)

    return outOfYAxisDataBounds
  }

  function constrainXAxisZoom(transformMatrix, prevTransformMatrix) {
    const { maxZoom } = zoomConfiguration
    const { scaleX } = transformMatrix
    const isOutOfBounds = isXAxisOutOfBounds(transformMatrix)
    const isMin = isScaleMin(scaleX)
    const isMax = isScaleMax(scaleX)

    const newTransformMatrix = Object.assign({}, transformMatrix, { scaleY: 1, translateY: 0 })

    if (isMin) {
      return DEFAULT_ZOOM
    }

    if (isMax) {
      newTransformMatrix.scaleX = maxZoom
      newTransformMatrix.translateX = prevTransformMatrix.translateX
    }

    if (isOutOfBounds) {
      return prevTransformMatrix
    }

    return newTransformMatrix
  }

  function constrainYAxisZoom(transformMatrix, prevTransformMatrix) {
    const { maxZoom } = zoomConfiguration
    const { scaleY } = transformMatrix
    const isOutOfBounds = isYAxisOutOfBounds(transformMatrix)
    const isMin = isScaleMin(scaleY)
    const isMax = isScaleMax(scaleY)

    const newTransformMatrix = Object.assign({}, transformMatrix, { scaleX: 1, translateX: 0 })

    if (isMin) {
      return DEFAULT_ZOOM
    }

    if (isMax) {
      newTransformMatrix.scaleY = maxZoom
      newTransformMatrix.translateY = prevTransformMatrix.translateY
    }

    if (isOutOfBounds) {
      return prevTransformMatrix
    }

    return newTransformMatrix
  }

  function constrainBothAxisZoom(transformMatrix, prevTransformMatrix) {
    const { maxZoom } = zoomConfiguration
    const { scaleX, scaleY } = transformMatrix
    const isOutOfBoundsX = isXAxisOutOfBounds(transformMatrix)
    const isOutOfBoundsY = isYAxisOutOfBounds(transformMatrix)
    const isMinX = isScaleMin(scaleX)
    const isMinY = isScaleMin(scaleY)
    const isMaxX = isScaleMax(scaleX)
    const isMaxY = isScaleMax(scaleY)

    if (isMaxX && isMaxY) {
      return Object.assign({}, transformMatrix, {
        scaleX: maxZoom,
        scaleY: maxZoom,
        translateX: prevTransformMatrix.translateX,
        translateY: prevTransformMatrix.translateY
      })
    }

    if (isMinX || isMinY) {
      return DEFAULT_ZOOM
    }

    if (isOutOfBoundsX || isOutOfBoundsY) {
      return prevTransformMatrix
    }

    return transformMatrix
  }

  function constrain(transformMatrix, prevTransformMatrix) {

    if (zoomConfiguration.direction === 'x') {
      return constrainXAxisZoom(transformMatrix, prevTransformMatrix)
    }

    if (zoomConfiguration.direction === 'y') {
      return constrainYAxisZoom(transformMatrix, prevTransformMatrix)
    }

    if (zoomConfiguration.direction === 'both') {
      return constrainBothAxisZoom(transformMatrix, prevTransformMatrix)
    }

    return transformMatrix
  }

  const height = parentHeight - margin.bottom - margin.top
  const width = parentWidth - margin.right - margin.left
  const leftPosition = left(tickDirection, margin)
  const topPosition = top(tickDirection, margin)

  return (
    <VisXZoom
      constrain={constrain}
      data={data}
      height={height}
      invertAxes={invertAxes}
      left={leftPosition}
      margin={margin}
      padding={padding}
      panning={panning}
      parentHeight={parentHeight}
      parentWidth={parentWidth}
      tickDirection={tickDirection}
      top={topPosition}
      width={width}
      zoomingComponent={ScatterPlot}
      zoomConfiguration={zoomConfiguration}
      zooming={zooming}
      {...props}
    />
  )
}

ZoomingScatterPlot.propTypes = {
  invertAxes: PropTypes.shape({
    x: PropTypes.bool,
    y: PropTypes.bool
  }),
  margin: PropTypes.shape({
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
    top: PropTypes.number
  }),
  padding: PropTypes.shape({
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
    top: PropTypes.number
  }),
  panning: PropTypes.bool,
  parentHeight: PropTypes.number.isRequired,
  parentWidth: PropTypes.number.isRequired,
  tickDirection: PropTypes.oneOf(['inner', 'outer']),
  zoomConfiguration: PropTypes.shape({
    direction: PropTypes.oneOf(['both', 'x', 'y']),
    minZoom: PropTypes.number,
    maxZoom: PropTypes.number,
    zoomInValue: PropTypes.number,
    zoomOutValue: PropTypes.number
  }),
  zooming: PropTypes.bool
}

export default ZoomingScatterPlot
