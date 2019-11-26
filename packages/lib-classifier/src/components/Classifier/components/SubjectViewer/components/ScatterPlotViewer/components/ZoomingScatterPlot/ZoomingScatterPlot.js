import React, { Component } from 'react'
import PropTypes from 'prop-types'
import VXZoom from '../../../SVGComponents/VXZoom'
import { getDataExtent, transformXScale, transformYScale } from '../../helpers/utils'
import { PAN_DISTANCE } from '../../helpers/constants'
import ScatterPlot from '../ScatterPlot'

class ZoomingScatterPlot extends Component {
  constructor(props) {
    super(props)
    const {
      margin,
      padding,
      parentHeight,
      parentWidth,
      tickDirection
    } = props

    this.rangeParameters = {
      margin,
      padding,
      parentHeight,
      parentWidth,
      tickDirection
    }
    this.constrain = this.constrain.bind(this)
  }

  zoomReset() {
    return {
      scaleX: 1,
      scaleY: 1,
      skewX: 0,
      skewY: 0,
      translateX: 0,
      translateY: 0
    }
  }

  isXAxisOutOfBounds(transformMatrix) {
    const { data } = this.props
    const dataExtent = getDataExtent(data)
    const xScale = transformXScale(data, transformMatrix, this.rangeParameters)
    const xScaleDomain = xScale.domain()
    const outOfXAxisDataBounds = xScaleDomain[0] < (dataExtent.x[0] - PAN_DISTANCE) || xScaleDomain[1] > (dataExtent.x[1] + PAN_DISTANCE)

    return outOfXAxisDataBounds
  }

  isXScaleMin(scaleX) {
    const { minZoom } = this.props.zoomConfiguration

    return scaleX < minZoom
  }

  isXScaleMax(scaleX) {
    const { maxZoom } = this.props.zoomConfiguration

    return scaleX > maxZoom
  }

  isYAxisOutOfBounds(transformMatrix) {
    const { data } = this.props
    const dataExtent = getDataExtent(data)
    const yScale = transformYScale(data, transformMatrix, this.rangeParameters)
    const yScaleDomain = yScale.domain()
    const outOfYAxisDataBounds = yScaleDomain[0] < (dataExtent.y[0] - PAN_DISTANCE) || yScaleDomain[1] > (dataExtent.y[1] + PAN_DISTANCE)

    return outOfYAxisDataBounds
  }

  isYScaleMin(scaleY) {
    const { minZoom } = this.props.zoomConfiguration

    return scaleY < minZoom
  }

  isYScaleMax(scaleY) {
    const { maxZoom } = this.props.zoomConfiguration

    return scaleY > maxZoom
  }

  constrainXAxisZoom (transformMatrix, prevTransformMatrix) {
    const { maxZoom } = this.props.zoomConfiguration
    const { scaleX } = transformMatrix
    const isXAxisOutOfBounds = this.isXAxisOutOfBounds(transformMatrix)
    const isXScaleMin = this.isXScaleMin(scaleX)
    const isXScaleMax = this.isXScaleMax(scaleX)

    const newTransformMatrix = Object.assign({}, transformMatrix, { scaleY: 1, translateY: 0 })

    if (isXScaleMin) {
      return this.zoomReset()
    }

    if (isXScaleMax) {
      newTransformMatrix.scaleX = maxZoom
      newTransformMatrix.translateX = prevTransformMatrix.translateX
    }

    if (isXAxisOutOfBounds) {
      return prevTransformMatrix
    }

    return newTransformMatrix
  }

  constrainYAxisZoom(transformMatrix, prevTransformMatrix) {
    const { maxZoom } = this.props.zoomConfiguration
    const { scaleY } = transformMatrix
    const isYAxisOutOfBounds = this.isYAxisOutOfBounds(transformMatrix)
    const isYScaleMin = this.isYScaleMin(scaleY)
    const isYScaleMax = this.isYScaleMax(scaleY)

    const newTransformMatrix = Object.assign({}, transformMatrix, { scaleX: 1, translateX: 0 })

    if (isYScaleMin) {
      return this.zoomReset()
    }

    if (isYScaleMax) {
      newTransformMatrix.scaleY = maxZoom
      newTransformMatrix.translateY = prevTransformMatrix.translateY
    }

    if (isYAxisOutOfBounds) {
      return prevTransformMatrix
    }

    return newTransformMatrix
  }

  constrainBothAxisZoom(transformMatrix, prevTransformMatrix) {
    const { maxZoom } = this.props.zoomConfiguration
    const { scaleX, scaleY } = transformMatrix
    const isXAxisOutOfBounds = this.isXAxisOutOfBounds(transformMatrix)
    const isYAxisOutOfBounds = this.isYAxisOutOfBounds(transformMatrix)
    const isXScaleMin = this.isXScaleMin(scaleX)
    const isYScaleMin = this.isYScaleMin(scaleY)
    const isXScaleMax = this.isXScaleMax(scaleX)
    const isYScaleMax = this.isYScaleMax(scaleY)

    if (isXScaleMax && isYScaleMax) {
      return Object.assign({}, transformMatrix, {
        scaleX: maxZoom,
        scaleY: maxZoom,
        translateX: prevTransformMatrix.translateX,
        translateY: prevTransformMatrix.translateY
      })
    }

    if (isXScaleMin || isYScaleMin) {
      return this.zoomReset()
    }

    if (isXAxisOutOfBounds || isYAxisOutOfBounds) {
      return prevTransformMatrix
    }

    return transformMatrix
  }

  constrain(transformMatrix, prevTransformMatrix) {
    const { zoomConfiguration } = this.props

    if (zoomConfiguration.direction === 'x') {
      return this.constrainXAxisZoom(transformMatrix, prevTransformMatrix)
    }

    if (zoomConfiguration.direction === 'y') {
      return this.constrainYAxisZoom(transformMatrix, prevTransformMatrix)
    }

    if (zoomConfiguration.direction === 'both') {
      return this.constrainBothAxisZoom(transformMatrix, prevTransformMatrix)
    }

    return transformMatrix
  }

  render() {
    return (
      <VXZoom
        constrain={this.constrain}
        zoomingComponent={ScatterPlot}
        {...this.props}
      />
    )
  }
}

ZoomingScatterPlot.propTypes = {
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

ZoomingScatterPlot.defaultProps = {
  margin: {
    bottom: 60,
    left: 60,
    right: 10,
    top: 10
  },
  padding: {
    bottom: 0,
    left: 0,
    right: 0,
    top: 0
  },
  panning: true, 
  tickDirection: 'outer',
  zoomConfiguration: {
    direction: 'both',
    minZoom: 1,
    maxZoom: 10,
    zoomInValue: 1.2,
    zoomOutValue: 0.8
  },
  zooming: true
}

export default ZoomingScatterPlot