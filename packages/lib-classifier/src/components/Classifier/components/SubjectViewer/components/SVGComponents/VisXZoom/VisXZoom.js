import { useWheel } from '@use-gesture/react'
import { localPoint } from '@visx/event'
import { Zoom } from '@visx/zoom'
import throttle from 'lodash/throttle'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'

import { useKeyZoom } from '@hooks'
import ZoomEventLayer from '../ZoomEventLayer'

const defaultZoomConfig = {
  direction: 'both',
  minZoom: 1,
  maxZoom: 10,
  onWheelThrottleWait: 0,
  zoomInValue: 1.2,
  zoomOutValue: 0.8
}

const DEFAULT_HANDLER = () => true

function VisXZoom({
  constrain,
  height,
  left = 0,
  move = false,
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
  const { onKeyZoom } = useKeyZoom()
  const zoomRef = useRef(null)
  const wheelEventLayer = useRef(null)

  useEffect(function setCallbacks() {
    setOnPan(handleToolbarPan)
    setOnZoom(handleToolbarZoom)
  }, [setOnPan, setOnZoom])

  function wheelDelta(event) {
    const zoomValue = (-event.deltaY > 0) ? 1.1 : 0.9
    return { scaleX: zoomValue, scaleY: zoomValue }
  }

  const wheelHandler = move && zooming ? (e) => zoomRef.current?.handleWheel(e) : DEFAULT_HANDLER
  const throttledWheelHandler = throttle(wheelHandler, zoomConfiguration?.onWheelThrottleWait)
  useWheel(({ event }) => {
    event.preventDefault()
    return throttledWheelHandler(event)
  }, {
    eventOptions: { passive: false },
    target: wheelEventLayer
  })

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
    zoomRef.current.scale({ scaleX: zoomInValue, scaleY: zoomInValue })
  }

  function zoomOut() {
    if (!zooming) return
    const { zoomOutValue } = zoomConfiguration
    zoomRef.current.scale({ scaleX: zoomOutValue, scaleY: zoomOutValue })
  }

  function zoomReset() {
    if (!zooming) return
    zoomRef.current.reset()
  }

  function zoomToPoint(event, zoomDirection) {
    const { zoomInValue, zoomOutValue } = zoomConfiguration
    const zoomValue = (zoomDirection === 'in') ? zoomInValue : zoomOutValue
    const point = localPoint(event)
    zoomRef.current.scale({ scaleX: zoomValue, scaleY: zoomValue, point })
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
    } = zoomRef.current
    const panDistance = 20
    const newTransformation = {
      translateX: translateX - xMultiplier * panDistance,
      translateY: translateY - yMultiplier * panDistance
    }
    zoomRef.current.setTranslate(newTransformation)
  }

  function onPointerEnter() {
    if (zooming) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }
  }

  function onPointerLeave() {
    if (zooming) {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }

    if (!zoomRef.current.isDragging && !panning) return
    
    zoomRef.current.dragEnd()
  }

  function onWheel(event) {
    if (zooming) {
      zoomRef.current.handleWheel(event)
    }
  }
  const throttledOnWheel = throttle(onWheel, zoomConfiguration?.onWheelThrottleWait)

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
      wheelDelta={wheelDelta}
    >
      {_zoom => {
        zoomRef.current = _zoom
        return (
          <g ref={wheelEventLayer}>
            <ZoomingComponent
              initialTransformMatrix={_zoom.initialTransformMatrix}
              move={move}
              transformMatrix={_zoom.transformMatrix}
              transform={_zoom.toString()}
              {...props}
            >
              <ZoomEventLayer
                focusable
                height={height}
                onDoubleClick={onDoubleClick}
                onKeyDown={onKeyZoom}
                onPointerEnter={onPointerEnter}
                onPointerDown={panning ? _zoom.dragStart : DEFAULT_HANDLER}
                onPointerMove={panning ? _zoom.dragMove : DEFAULT_HANDLER}
                onPointerUp={panning ? _zoom.dragEnd : DEFAULT_HANDLER}
                onPointerLeave={onPointerLeave}
                onWheel={throttledOnWheel}
                panning={panning}
                tabIndex={0}
                width={width}
              />
            </ZoomingComponent>
          </g>
        )
      }}
    </Zoom>
  )
}

VisXZoom.propTypes = {
  constrain: PropTypes.func,
  height: PropTypes.number.isRequired,
  left: PropTypes.number,
  move: PropTypes.bool,
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

export default observer(VisXZoom)
