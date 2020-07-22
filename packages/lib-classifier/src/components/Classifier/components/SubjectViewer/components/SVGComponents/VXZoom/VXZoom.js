import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { localPoint } from '@vx/event'
import { Zoom } from '@vx/zoom'
import ZoomEventLayer from '../ZoomEventLayer'

class VXZoom extends PureComponent {
  constructor (props) {
    super(props)
    const { setOnPan, setOnZoom } = props

    setOnPan(this.handleToolbarPan.bind(this))
    setOnZoom(this.handleToolbarZoom.bind(this))

    this.onDoubleClick = this.onDoubleClick.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
    this.onPan = this.onPan.bind(this)
  }

  static zoom = null

  handleToolbarPan (type) {
    this.onPan(type)
  }

  handleToolbarZoom (type) {
    const doZoom = {
      zoomin: this.zoomIn.bind(this),
      zoomout: this.zoomOut.bind(this),
      zoomto: this.zoomReset.bind(this)
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

  onPan (direction) {
    const { 
      transformMatrix: {
        translateX,
        translateY
      }
    } = this.zoom
    const newTransformation = { 
      down: { translateX, translateY: translateY - 2 },
      left: { translateX: translateX + 2, translateY },
      right: { translateX: translateX - 2, translateY },
      up: { translateX, translateY: translateY + 2 }
    }
    this.zoom.setTranslate(newTransformation[direction])
  }

  onKeyDown (event) {
    const { panning, zooming } = this.props
    const htmlTag = event.target?.tagName.toLowerCase()
    if (htmlTag === 'rect' && (zooming || panning)) {
      switch (event.key) {
        case '+':
        case '=': {
          this.zoomIn()
          return true
        }
        case '-':
        case '_': {
          this.zoomOut()
          return true
        }
        case 'ArrowRight': {
          event.preventDefault()
          this.onPan('right')
          return true
        }
        case 'ArrowLeft': {
          event.preventDefault()
          this.onPan('left')
          return true
        }
        case 'ArrowUp': {
          event.preventDefault()
          this.onPan('up')
          return true
        }
        case 'ArrowDown': {
          event.preventDefault()
          this.onPan('down')
          return true
        }
        default: {
          return true
        }
      }
    }

    return true
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
      left,
      panning,
      height,
      top,
      width,
      zoomConfiguration,
      zoomingComponent
    } = this.props

    const ZoomingComponent = zoomingComponent
    return (
      <Zoom
        constrain={constrain}
        height={height}
        left={left}
        scaleXMin={zoomConfiguration.minZoom}
        scaleXMax={zoomConfiguration.maxZoom}
        scaleYMin={zoomConfiguration.minZoom}
        scaleYMax={zoomConfiguration.maxZoom}
        passive
        top={top}
        width={width}
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
                focusable
                height={height}
                left={left}
                onDoubleClick={this.onDoubleClick}
                onKeyDown={this.onKeyDown}
                onMouseDown={panning ? zoom.dragStart : () => { }}
                onMouseEnter={this.onMouseEnter}
                onMouseMove={panning ? zoom.dragMove : () => { }}
                onMouseUp={panning ? zoom.dragEnd : () => { }}
                onMouseLeave={this.onMouseLeave}
                onWheel={(event) => this.onWheel(event)}
                panning={panning}
                tabIndex={0}
                top={top}
                width={width}
              />
            </ZoomingComponent>
          )
        }}
      </Zoom>
    )
  }
}

VXZoom.defaultProps = {
  left: 0,
  panning: false,
  setOnPan: () => true,
  setOnZoom: () => true,
  top: 0,
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
  data: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]).isRequired,
  height: PropTypes.number.isRequired,
  left: PropTypes.number,
  panning: PropTypes.bool,
  setOnPan: PropTypes.func,
  setOnZoom: PropTypes.func,
  top: PropTypes.number,
  width: PropTypes.number.isRequired,
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
