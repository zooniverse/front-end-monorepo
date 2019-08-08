import React, { Component, forwardRef} from 'react'
import PropTypes from 'prop-types'
import { ParentSize } from '@vx/responsive'
import { localPoint } from '@vx/event'
import { Zoom } from '@vx/zoom'
import ZoomEventLayer from '../SVGComponents/ZoomEventLayer'

function withVXZoom (WrappedComponent) {
  class VXZoom extends Component {
    constructor(props) {
      super(props)
      const { zoomInValue, zoomOutValue } = props.zoomConfiguration
      props.setOnZoom(this.handleToolbarZoom.bind(this))

      this.state = {
        scaleValues: {
          in: {
            both: {
              scaleX: zoomInValue,
              scaleY: zoomInValue
            },
            none: {
              scaleX: 1,
              scaleY: 1
            },
            x: {
              scaleX: zoomInValue,
              scaleY: 1
            },
            y: {
              scaleX: 1,
              scaleY: zoomInValue
            }
          },
          out: {
            both: {
              scaleX: zoomOutValue,
              scaleY: zoomOutValue
            },
            none: {
              scaleX: 1,
              scaleY: 1
            },
            x: {
              scaleX: zoomOutValue,
              scaleY: 1
            },
            y: {
              scaleX: 1,
              scaleY: zoomOutValue
            }
          }
        }
      }

      this.onDoubleClick = this.onDoubleClick.bind(this)
      this.onMouseLeave = this.onMouseLeave.bind(this)
    }

    static zoom = null

    handleToolbarZoom(type, zoomValue) {
      console.log('handleToolbarZoom')
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
      const { direction } = this.props.zoomConfiguration
      const { scaleX, scaleY } = this.state.scaleValues.in[direction]
      console.log('scaleX, scaleY', scaleX, scaleY)
      this.zoom.scale({ scaleX, scaleY })
    }

    zoomOut () {
      const { direction } = this.props.zoomConfiguration
      const { scaleX, scaleY } = this.state.scaleValues.out[direction]
      this.zoom.scale({ scaleX, scaleY })
    }

    zoomTo () {
      this.zoom.reset()
    }

    zoomToPoint (event, zoomDirection) {
      const { direction } = this.props.zoomConfiguration
      const { scaleX, scaleY } = this.state.scaleValues[zoomDirection][direction]
      const point = localPoint(event)
      this.zoom.scale({ scaleX, scaleY, point })
    }

    onDoubleClick (event) {
      if (!this.props.zooming) event.preventDefault()
      this.zoomToPoint(event, 'in')
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

    // pan(xMultiplier) {
    //   this.zoom.translateBy(this.d3interfaceLayer.transition().duration(ZOOMING_TIME), xMultiplier * PAN_DISTANCE, 0)
    // }

    render() {
      const {
        panning,
        zoomConfiguration
      } = this.props

      return (
        <ParentSize>
          {parent => (
            <Zoom
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