import { useEffect } from 'react';
import PropTypes from 'prop-types'
import { localPoint } from '@visx/event'
import { Zoom } from '@visx/zoom'
import ZoomEventLayer from '../ZoomEventLayer'
import withKeyZoom from '../../../../withKeyZoom'

const defaultZoomConfig = {
  direction: 'both',
  minZoom: 1,
  maxZoom: 10,
  zoomInValue: 1.2,
  zoomOutValue: 0.8
}

const DEFAULT_HANDLER = () => true
let zoom = null

function VisXZoom({
  constrain,
  height,
  left = 0,
  onKeyDown = DEFAULT_HANDLER,
  panning = false,
  setOnPan = DEFAULT_HANDLER,
  setOnZoom = DEFAULT_HANDLER,
  top = 0,
  width,
  zoomConfiguration = defaultZoomConfig,
  zoomingComponent,
  zooming = false,
  ...props
}) {
  useEffect(function setCallbacks() {
    setOnPan(handleToolbarPan)
    setOnZoom(handleToolbarZoom)
  }, [setOnPan, setOnZoom])

  function handleToolbarPan(xMultiplier, yMultiplier) {
    onPan(xMultiplier, yMultiplier)
  }

  function handleToolbarZoom(type) {
    const doZoom = {
      zoomin: zoomIn,
      zoomout: zoomOut,
      zoomto: zoomReset
    }

    if (doZoom[type]) {
      doZoom[type]()
    }
  }

  function zoomIn() {
    if (!zooming) return
    const { zoomInValue } = zoomConfiguration
    zoom.scale({ scaleX: zoomInValue, scaleY: zoomInValue })
  }

  function zoomOut() {
    if (!zooming) return
    const { zoomOutValue } = zoomConfiguration
    zoom.scale({ scaleX: zoomOutValue, scaleY: zoomOutValue })
  }

  function zoomReset() {
    if (!zooming) return
    zoom.reset()
  }

  function zoomToPoint(event, zoomDirection) {
    const { zoomInValue, zoomOutValue } = zoomConfiguration
    const zoomValue = (zoomDirection === 'in') ? zoomInValue : zoomOutValue
    const point = localPoint(event)
    zoom.scale({ scaleX: zoomValue, scaleY: zoomValue, point })
  }

  function onDoubleClick(event) {
    if (zooming) {
      zoomToPoint(event, 'in')
    } else {
      event.preventDefault()
    }
  }

  function onPan(xMultiplier, yMultiplier) {
    const { 
      transformMatrix: {
        translateX,
        translateY
      }
    } = zoom
    const panDistance = 20
    const newTransformation = {
      translateX: translateX - xMultiplier * panDistance,
      translateY: translateY - yMultiplier * panDistance
    }
    zoom.setTranslate(newTransformation)
  }

  function onPointerEnter() {
    if (zooming) {
      document.body.style.overflow = 'hidden'
    }
  }

  function onPointerLeave() {
    if (zooming) {
      document.body.style.overflow = ''
    }
    if (!zoom.isDragging && !panning) return
    zoom.dragEnd()
  }

  function onWheel(event) {
    // performance of this is pretty bad
    if (zooming) {
      const zoomDirection = (-event.deltaY > 0) ? 'in' : 'out'
      zoomToPoint(event, zoomDirection)
    }
  }


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
      {_zoom => {
        zoom = _zoom
        return (
          <ZoomingComponent
            initialTransformMatrix={_zoom.initialTransformMatrix}
            transformMatrix={_zoom.transformMatrix}
            transform={_zoom.toString()}
            {...props}
          >
            <ZoomEventLayer
              focusable
              height={height}
              left={left}
              onDoubleClick={onDoubleClick}
              onKeyDown={onKeyDown}
              onPointerDown={panning ? _zoom.dragStart : DEFAULT_HANDLER}
              onPointerEnter={onPointerEnter}
              onPointerMove={panning ? _zoom.dragMove : DEFAULT_HANDLER}
              onPointerUp={panning ? _zoom.dragEnd : DEFAULT_HANDLER}
              onPointerLeave={onPointerLeave}
              onWheel={onWheel}
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

VisXZoom.propTypes = {
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

export default withKeyZoom(VisXZoom)
export { VisXZoom }
