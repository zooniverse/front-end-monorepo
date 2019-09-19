import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { localPoint } from '@vx/event'
import { Zoom } from '@vx/zoom'
import * as d3 from 'd3'
import scaleTransform from './helpers/scaleTransform'
import { MARGIN, PADDING, PAN_DISTANCE } from './helpers/constants'
import ZoomEventLayer from '../SVGComponents/ZoomEventLayer'

class VXZoom extends PureComponent {
  constructor(props) {
    super(props)
    const {
      data,
      parentHeight,
      parentWidth,
      setOnZoom
    } = props

    setOnZoom(this.handleToolbarZoom.bind(this))

    this.state = {
      dataExtent: {
        x: d3.extent(data.x),
        y: d3.extent(data.y)
      },
      xRange: [0 + PADDING, parentWidth - MARGIN],
      yRange: [parentHeight - PADDING, MARGIN + 0]
    }

    this.constrain = this.constrain.bind(this)
    this.onDoubleClick = this.onDoubleClick.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
  }

  static zoom = null

  handleToolbarZoom(type) {
    const doZoom = {
      'zoomin': this.zoomIn.bind(this),
      'zoomout': this.zoomOut.bind(this),
      'zoomto': this.zoomReset.bind(this)
    }

    if (doZoom[type]) {
      doZoom[type]()
    }
  }

  zoomIn() {
    if (!this.props.zooming) return
    const { zoomInValue } = this.props.zoomConfiguration
    this.zoom.scale({ scaleX: zoomInValue, scaleY: zoomInValue })
  }

  zoomOut() {
    if (!this.props.zooming) return
    const { zoomOutValue } = this.props.zoomConfiguration
    this.zoom.scale({ scaleX: zoomOutValue, scaleY: zoomOutValue })
  }

  zoomReset() {
    if (!this.props.zooming) return
    this.zoom.reset()
  }

  zoomToPoint(event, zoomDirection) {
    const { zoomInValue, zoomOutValue } = this.props.zoomConfiguration
    const zoomValue = (zoomDirection === 'in') ? zoomInValue : zoomOutValue
    const point = localPoint(event)
    this.zoom.scale({ scaleX: zoomValue, scaleY: zoomValue, point })
  }

  onDoubleClick(event) {
    if (this.props.zooming) {
      this.zoomToPoint(event, 'in')
    } else {
      event.preventDefault()
    }
  }

  onMouseLeave() {
    if (!this.zoom.isDragging && !this.props.panning) return
    this.zoom.dragEnd()
  }

  onWheel(event) {
    // performance of this is pretty bad
    if (this.props.zooming) {
      const zoomDirection = (-event.deltaY > 0) ? 'in' : 'out'
      this.zoomToPoint(event, zoomDirection)
    } else {
      event.preventDefault()
    }
  }

  isXAxisOutOfBounds(transformMatrix) {
    const { dataExtent, xRange, yRange } = this.state

    const { xScale } = scaleTransform(dataExtent, transformMatrix, xRange, yRange)
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
    const { dataExtent, xRange, yRange } = this.state
    const { yScale } = scaleTransform(dataExtent, transformMatrix, xRange, yRange)
    const yScaleDomain = yScale.domain()
    const outOfYAxisDataBounds = yScaleDomain[0] < (dataExtent.y[0] - PAN_DISTANCE) || yScaleDomain[1] > (dataExtent.y[1] + PAN_DISTANCE)
    

    return outOfYAxisDataBounds
  }

  isYScaleMin (scaleY) {
    const {  minZoom } = this.props.zoomConfiguration

    return scaleY < minZoom 
  }

  isYScaleMax (scaleY) {
    const { maxZoom } = this.props.zoomConfiguration

    return scaleY > maxZoom
  }

  constrainXAxisZoom(transformMatrix, prevTransformMatrix) {
    const { maxZoom } = this.props.zoomConfiguration
    const { scaleX } = transformMatrix
    const isXAxisOutOfBounds = this.isXAxisOutOfBounds(transformMatrix)
    const isXScaleMin = this.isXScaleMin(scaleX)
    const isXScaleMax = this.isXScaleMax(scaleX)

    const newTransformMatrix = Object.assign({}, transformMatrix, { scaleY: 1, translateY: 0 })

    if (isXScaleMin) {
      this.zoomReset()
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
      this.zoomReset()
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
      this.zoomReset()
    }

    if (isXAxisOutOfBounds || isYAxisOutOfBounds) {
      console.log('out of bounds')
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
    const {
      panning,
      parentHeight,
      parentWidth,
      wrappedComponent,
      zoomConfiguration
    } = this.props

    const WrappedComponent = wrappedComponent
    return (
      <Zoom
        constrain={this.constrain}
        height={parentHeight}
        scaleXMin={zoomConfiguration.minZoom}
        scaleXMax={zoomConfiguration.maxZoom}
        scaleYMin={zoomConfiguration.minZoom}
        scaleYMax={zoomConfiguration.maxZoom}
        passive
        width={parentWidth}
      >
        {zoom => {
          {/* console.log('zoom', zoom) */}
          this.zoom = zoom
          return (
            <WrappedComponent
              dataExtent={this.state.dataExtent}
              transformMatrix={zoom.transformMatrix}
              xRange={this.state.xRange}
              yRange={this.state.yRange}
              {...this.props}
            >
              <ZoomEventLayer
                onWheel={(event) => this.onWheel(event)}
                onMouseDown={panning ? zoom.dragStart : () => {}}
                onMouseMove={panning ? zoom.dragMove : () => {}}
                onMouseUp={panning ? zoom.dragEnd : () => {}}
                onMouseLeave={this.onMouseLeave}
                onDoubleClick={this.onDoubleClick}
                panning={panning}
                parentHeight={parentHeight}
                parentWidth={parentWidth}
              />
            </WrappedComponent>
          )
        }}
      </Zoom>
    )
  }
}

VXZoom.defaultProps = {
  onPan: () => true,
  panning: false,
  setOnZoom: () => true,
  zoomConfiguration: {
    direction: 'both',
    minZoom: 1,
    maxZoom: 10,
    zoomInValue: 1.2,
    zoomOutValue: 0.8
  },
  zooming: false
}

VXZoom.propTypes = {
  data: PropTypes.object.isRequired,
  onPan: PropTypes.func,
  panning: PropTypes.bool,
  parentHeight: PropTypes.number.isRequired,
  parentWidth: PropTypes.number.isRequired,
  setOnZoom: PropTypes.func,
  zoomConfiguration: PropTypes.shape({
    direction: PropTypes.oneOf(['both', 'x', 'y']),
    minZoom: PropTypes.number,
    maxZoom: PropTypes.number,
    zoomInValue: PropTypes.number,
    zoomOutValue: PropTypes.number
  }),
  zooming: PropTypes.bool
}

export default VXZoom