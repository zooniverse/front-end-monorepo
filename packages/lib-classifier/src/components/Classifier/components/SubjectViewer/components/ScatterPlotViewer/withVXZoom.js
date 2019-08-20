import React, { PureComponent, forwardRef} from 'react'
import PropTypes from 'prop-types'
import { withParentSize, ParentSize } from '@vx/responsive'
import { localPoint } from '@vx/event'
import { Zoom } from '@vx/zoom'
import * as d3 from 'd3'
import scaleTransform from './helpers/scaleTransform'
import { MARGIN, PADDING } from './helpers/constants'
import ZoomEventLayer from '../SVGComponents/ZoomEventLayer'

function withVXZoom (WrappedComponent) {
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
        xRange: [PADDING, parentWidth - MARGIN],
        yRange: [parentHeight - PADDING, MARGIN]
      }

      this.constrain = this.constrain.bind(this)
      this.onDoubleClick = this.onDoubleClick.bind(this)
      this.onMouseLeave = this.onMouseLeave.bind(this)
    }

    static zoom = null

    handleToolbarZoom(type, zoomValue) {
      const doZoom = {
        'zoomin': this.zoomIn.bind(this),
        'zoomout': this.zoomOut.bind(this),
        'zoomto': this.zoomTo.bind(this)
      }

      if (doZoom[type]) {
        doZoom[type](zoomValue)
      }
    }

    zoomIn () {
      if (!this.props.zooming) return
      const { zoomInValue } = this.props.zoomConfiguration
      this.zoom.scale({ scaleX: zoomInValue, scaleY: zoomInValue })
    }

    zoomOut () {
      if (!this.props.zooming) return
      const { zoomOutValue } = this.props.zoomConfiguration
      this.zoom.scale({ scaleX: zoomOutValue, scaleY: zoomOutValue })
    }

    zoomTo () {
      this.zoom.reset()
    }

    zoomToPoint (event, zoomDirection) {
      if (!this.props.zooming) event.preventDefault()
      const { zoomInValue, zoomOutValue } = this.props.zoomConfiguration
      const zoomValue = (zoomDirection === 'in') ? zoomInValue : zoomOutValue
      const point = localPoint(event)
      this.zoom.scale({ scaleX: zoomValue, scaleY: zoomValue, point })
    }

    onDoubleClick (event) {
      if (!this.props.zooming) event.preventDefault()
      this.zoomToPoint(event, 'in')
    }

    constrainXAxisZoom (transformMatrix, prevTransformMatrix) {
      const { zoomConfiguration } = this.props
      const { maxZoom, minZoom } = zoomConfiguration
      const { scaleX, translateX } = transformMatrix
      const { dataExtent, xRange, yRange } = this.state
      
      const { xScale, yScale } = scaleTransform(dataExtent, transformMatrix, xRange, yRange)
      const xScaleDomain = xScale.domain()
      const xScaleRange = xScale.range()
      console.log('domain', xScale.domain(), xScale.range())
      const outOfXAxisDataBounds = xScaleDomain[0] < dataExtent.x[0] || xScaleDomain[1] > xScaleRange[0]
      const shouldConstrainScaleX = scaleX > maxZoom || scaleX < minZoom
      if (outOfXAxisDataBounds) {
        return prevTransformMatrix
      }

      if (shouldConstrainScaleX) {
        return prevTransformMatrix
      }

      const newTransformMatrix = Object.assign({}, transformMatrix, { scaleY: 1, translateY: 0 })
      if (newTransformMatrix.scaleX < 1) {
        newTransformMatrix.scaleX = 1
        newTransformMatrix.translateX = 0
      }
      return newTransformMatrix
    }

    constrainYAxisZoom (transformMatrix, prevTransformMatrix) {
      const { data, zoomConfiguration } = this.props
      const { maxZoom, minZoom } = zoomConfiguration
      const { scaleY, translateY } = transformMatrix
      const yDataExtent = d3.extent(data.y)
      const outOfYAxisDataBounds = translateY > yDataExtent[1]
      const shouldConstrainScaleY = scaleY > maxZoom || scaleY < minZoom

      if (outOfYAxisDataBounds) {
        return prevTransformMatrix
      }

      if (shouldConstrainScaleY) {
        return prevTransformMatrix
      }

      const newTransformMatrix = Object.assign({}, transformMatrix, { scaleX: 1, translateX: 0 })
      if (newTransformMatrix.scaleY < 1) {
        newTransformMatrix.scaleY = 1
        newTransformMatrix.translateY = 0
      }
      return newTransformMatrix
    }

    constrainBothAxisZoom (transformMatrix, prevTransformMatrix) {
      const { zoomConfiguration } = this.props
      const { dataExtent } = this.state
      const { maxZoom, minZoom } = zoomConfiguration
      const { scaleY, translateY } = transformMatrix
      const outOfXAxisDataBounds = translateX > dataExtent.x[1]
      const shouldConstrainScaleX = scaleX > maxZoom || scaleX < minZoom
      const outOfYAxisDataBounds = translateY > dataExtent.y[1]
      const shouldConstrainScaleY = scaleY > maxZoom || scaleY < minZoom

      if (outOfXAxisDataBounds || outOfYAxisDataBounds) {
        return prevTransformMatrix
      }

      if (shouldConstrainScaleX || shouldConstrainScaleY) {
        return prevTransformMatrix
      }

      return transformMatrix
    }

    constrain (transformMatrix, prevTransformMatrix) {
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

      if (zoomConfiguration.direction === 'none') {
        return prevTransformMatrix
      }

      return transformMatrix
    }

    onMouseLeave () {
      if (!this.zoom.isDragging && !this.props.panning) return
      this.zoom.dragEnd()
    }

    onWheel (event) {
      // performance of this is pretty bad
      if (!this.props.zooming) event.preventDefault()
      const zoomDirection = (-event.deltaY > 0) ? 'in' : 'out'
      this.zoomToPoint(event, zoomDirection)
    }

    render() {
      const {
        panning,
        parentHeight,
        parentWidth,
        zoomConfiguration
      } = this.props

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
            console.log('zoom', zoom)
            this.zoom = zoom
            return (
              <WrappedComponent
                margin={MARGIN}
                padding={PADDING}
                parentHeight={parentHeight}
                parentWidth={parentWidth}
                transformMatrix={zoom.transformMatrix}
                {...this.props}
              >
                <ZoomEventLayer
                  onWheel={(event) => this.onWheel(event)}
                  onMouseDown={panning ? zoom.dragStart : () => { }}
                  onMouseMove={panning ? zoom.dragMove : () => { }}
                  onMouseUp={panning ? zoom.dragEnd : () => { }}
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
    forwardedRef: null,
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
    onPan: PropTypes.func,
    panning: PropTypes.bool,
    setOnZoom: PropTypes.func,
    zoomConfiguration: PropTypes.shape({
      direction: PropTypes.oneOf(['both', 'none', 'x', 'y']),
      minZoom: PropTypes.number,
      maxZoom: PropTypes.number,
      zoomInValue: PropTypes.number,
      zoomOutValue: PropTypes.number
    }),
    zooming: PropTypes.bool
  }

  const DecoratedVXZoom = forwardRef(function (props, ref) {
    return <VXZoom {...props} forwardedRef={ref} />
  })
  const name = WrappedComponent.displayName || WrappedComponent.name
  DecoratedVXZoom.displayName = `withVXZoom(${name})`
  DecoratedVXZoom.wrappedComponent = WrappedComponent

  return withParentSize(DecoratedVXZoom)
}

export default withVXZoom