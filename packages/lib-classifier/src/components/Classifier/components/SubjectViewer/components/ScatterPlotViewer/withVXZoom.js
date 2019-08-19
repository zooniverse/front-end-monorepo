import React, { PureComponent, forwardRef} from 'react'
import PropTypes from 'prop-types'
import { ParentSize } from '@vx/responsive'
import { localPoint } from '@vx/event'
import { Zoom } from '@vx/zoom'
import * as d3 from 'd3'
import ZoomEventLayer from '../SVGComponents/ZoomEventLayer'
import { transform } from 'popmotion';

function withVXZoom (WrappedComponent) {
  class VXZoom extends PureComponent {
    constructor(props) {
      super(props)
      props.setOnZoom(this.handleToolbarZoom.bind(this))

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

    applyMatrixToPoint(matrix, { x, y }) {
      return {
        x: matrix.scaleX * x + matrix.skewX * y + matrix.translateX,
        y: matrix.skewY * x + matrix.scaleY * y + matrix.translateY
      }
    }

    constrain (transformMatrix, prevTransformMatrix) {
      const { data, parentWidth, parentHeight, zoomConfiguration } = this.props
      const dataExtent = {
        x: d3.extent(data.x),
        y: d3.extent(data.y)
      }

      const translatedPoints = this.applyMatrixToPoint(this.zoom.initialTransformMatrix, {x: dataExtent.x[1], y: dataExtent.y[1] })
      console.log(translatedPoints)
      const outOfXAxisDataBounds = transformMatrix.translateX > dataExtent.x[1]
      const outOfYAxisDataBounds = transformMatrix.translateY > dataExtent.y[1]

      if (zoomConfiguration.direction === 'x') {
        if (outOfXAxisDataBounds) {
          return prevTransformMatrix
        }

        const newTransformMatrix = Object.assign({}, transformMatrix, { scaleY: 1, translateY: 0 })
        if (newTransformMatrix.scaleX < 1) {
          newTransformMatrix.scaleX = 1
          newTransformMatrix.translateX = 0
        }
        return newTransformMatrix
      }

      if (zoomConfiguration.direction === 'y') {
        if (outOfYAxisDataBounds) {
          return prevTransformMatrix
        }

        const newTransformMatrix = Object.assign({}, transformMatrix, { scaleX: 1, translateX: 0 })
        if (newTransformMatrix.scaleY < 1) {
          newTransformMatrix.scaleY = 1
          newTransformMatrix.translateY = 0
        }
        return newTransformMatrix
      }

      if (zoomConfiguration.direction === 'both') {
        if (outOfXAxisDataBounds || outOfYAxisDataBounds) {
          return prevTransformMatrix
        }
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
        zoomConfiguration
      } = this.props

      return (
        <ParentSize>
          {parent => (
            <Zoom
              constrain={this.constrain}
              height={parent.height}
              scaleXMin={zoomConfiguration.minZoom}
              scaleXMax={zoomConfiguration.maxZoom}
              scaleYMin={zoomConfiguration.minZoom}
              scaleYMax={zoomConfiguration.maxZoom}
              passive
              width={parent.width}
            >
              {zoom => {
                console.log('zoom', zoom)
                this.zoom = zoom
                return (
                  <WrappedComponent
                    parentHeight={parent.height}
                    parentWidth={parent.width}
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
                      parentHeight={parent.height}
                      parentWidth={parent.width}
                    />
                  </WrappedComponent>
                )
              }}
            </Zoom>
          )}
        </ParentSize>
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

  return DecoratedVXZoom
}

export default withVXZoom