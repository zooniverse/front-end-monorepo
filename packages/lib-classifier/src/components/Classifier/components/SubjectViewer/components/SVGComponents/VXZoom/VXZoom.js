import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { localPoint } from '@vx/event'
import { Zoom } from '@vx/zoom'
import ZoomEventLayer from '../ZoomEventLayer'

class VXZoom extends PureComponent {
  constructor (props) {
    super(props)
    const { setOnZoom } = props

    setOnZoom(this.handleToolbarZoom.bind(this))

    this.onDoubleClick = this.onDoubleClick.bind(this)
    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
  }

  static zoom = null

  handleToolbarZoom (type) {
    const doZoom = {
      'zoomin': this.zoomIn.bind(this),
      'zoomout': this.zoomOut.bind(this),
      'zoomto': this.zoomReset.bind(this)
    }

    if (doZoom[type]) {
      doZoom[type]()
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

  zoomReset () {
    if (!this.props.zooming) return
    this.zoom.reset()
  }

  zoomToPoint (event, zoomDirection) {
    const { zoomInValue, zoomOutValue } = this.props.zoomConfiguration
    const zoomValue = (zoomDirection === 'in') ? zoomInValue : zoomOutValue
    const point = localPoint(event)
    this.zoom.scale({ scaleX: zoomValue, scaleY: zoomValue, point })
  }

  onDoubleClick (event) {
    if (this.props.zooming) {
      this.zoomToPoint(event, 'in')
    } else {
      event.preventDefault()
    }
  }

  onMouseEnter () {
    if (this.props.zooming) {
      document.body.style.overflow = 'hidden'
    }
  }

  onMouseLeave () {
    if (this.props.zooming) {
      document.body.style.overflow = ''
    }
    if (!this.zoom.isDragging && !this.props.panning) return
    this.zoom.dragEnd()
  }

  onWheel (event) {
    // performance of this is pretty bad
    if (this.props.zooming) {
      const zoomDirection = (-event.deltaY > 0) ? 'in' : 'out'
      this.zoomToPoint(event, zoomDirection)
    }
  }

  render () {
    const {
      constrain,
      panning,
      parentHeight,
      parentWidth,
      zoomConfiguration,
      zoomingComponent
    } = this.props

    const ZoomingComponent = zoomingComponent
    return (
      <Zoom
        constrain={constrain}
        height={parentHeight}
        scaleXMin={zoomConfiguration.minZoom}
        scaleXMax={zoomConfiguration.maxZoom}
        scaleYMin={zoomConfiguration.minZoom}
        scaleYMax={zoomConfiguration.maxZoom}
        passive
        width={parentWidth}
      >
        {zoom => {
          this.zoom = zoom
          return (
            <ZoomingComponent
              initialTransformMatrix={zoom.initialTransformMatrix}
              transformMatrix={zoom.transformMatrix}
              {...this.props}
            >
              <ZoomEventLayer
                onWheel={(event) => this.onWheel(event)}
                onMouseDown={panning ? zoom.dragStart : () => { }}
                onMouseEnter={this.onMouseEnter}
                onMouseMove={panning ? zoom.dragMove : () => { }}
                onMouseUp={panning ? zoom.dragEnd : () => { }}
                onMouseLeave={this.onMouseLeave}
                onDoubleClick={this.onDoubleClick}
                panning={panning}
                parentHeight={parentHeight}
                parentWidth={parentWidth}
              />
            </ZoomingComponent>
          )
        }}
      </Zoom>
    )
  }
}

VXZoom.defaultProps = {
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
  constrain: PropTypes.func,
  data: PropTypes.object.isRequired,
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
  zooming: PropTypes.bool,
  zoomingComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired
}

export default VXZoom
