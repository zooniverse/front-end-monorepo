import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { number, object } from 'prop-types'
import { pointColor } from './../helpers/pointColor.js'

const BACKGROUND_COLOR = '#222'

export const Plane = ({ annotations, dimension, tool, viewer }) => {
  const [frame, setFrame] = useState(viewer.getPlaneFrame({ dimension }))
  const canvasRef = useRef(null)
  const canvasLength = useRef(0)
  const frameCanvas = document.createElement('canvas')
  frameCanvas.width = viewer.base
  frameCanvas.height = viewer.base

  // State Change Management through useEffect()
  useEffect(() => {
    setupFrame()

    // State Listeners to bypass React rerenders
    annotations.on('add:annotation', drawFrame)
    annotations.on('remove:annotation', drawFrame)
    annotations.on('update:annotation', drawFrame)
    viewer.on(`change:dimension-${dimension}:frame`, drawFrame)
    viewer.on('change:threshold', drawFrame)

    return () => {
      annotations.off('add:annotation', drawFrame)
      annotations.off('remove:annotation', drawFrame)
      annotations.off('update:annotation', drawFrame)
      viewer.off(`change:dimension-${dimension}:frame`, drawFrame)
      viewer.off('change:threshold', drawFrame)
    }
  }, [])

  // Layout Effects allows us to listen for window resize
  useLayoutEffect(() => {
    window.addEventListener('resize', setupFrame)
    return () => window.removeEventListener('resize', setupFrame)
  }, [])

  function setupFrame () {
    // Use parent element to infer frame size
    const { width } =
      canvasRef.current.parentElement.getBoundingClientRect()

    canvasLength.current = width
    const ctx = canvasRef.current.getContext('2d')
    ctx.canvas.width = canvasLength.current
    ctx.canvas.height = canvasLength.current

    // (re)draw the current frame
    drawFrame()
  }

  // Functions that do the actual work
  async function drawFrame (e) {
    // catches events and sets relevant frame if necessary
    if (e && e.frame !== undefined) {
      setFrame(e.frame)
    }

    // draw to offscreen canvas
    const context = frameCanvas.getContext('2d')
    const frame = viewer.getPlaneFrame({ dimension })
    frame.forEach((lines, x) => {
      lines.forEach((point, y) => {
        drawPoint({ context, point, x, y })
      })
    })

    // transfer to screen
    const data = await window.createImageBitmap(frameCanvas, {
      resizeWidth: canvasLength.current,
      resizeHeight: canvasLength.current,
      resizeQuality: 'pixelated'
    })
    canvasRef.current.getContext('2d').drawImage(data, 0, 0)
  }

  function drawPoint ({ context, point, x, y }) {
    // Draw points that are not in threshold same color as background
    if (viewer.isPointInThreshold({ point })) {
      context.fillStyle = pointColor({
        annotationIndex: viewer.getPointAnnotationIndex({ point }),
        pointValue: viewer.getPointValue({ point })
      })
    } else {
      context.fillStyle = BACKGROUND_COLOR
    }
    context.fillRect(x, y, 1, 1)
  }

  // Interaction Functions
  function onClick (e) {
    if (!tool.events.click) return // no tool, no interaction on click

    const { button, clientX, clientY, shiftKey } = e
    const { left, top } = canvasRef.current.getBoundingClientRect()
    const pixelLength = canvasLength.current / viewer.base

    const x = Math.floor((clientX - left) / pixelLength)
    const y = Math.floor((clientY - top) / pixelLength)
    const frame = viewer.getPlaneFrame({ dimension })
    const point = frame[x][y]

    if (tool.events.click) {
      tool.events.click({
        button,
        point,
        shiftKey
      })
    }

    e.preventDefault()
  }

  function onWheel (e) {
    const frameCurrent = viewer.getPlaneFrame({ dimension })
    const frameNew =
      e.deltaY > 0 && frameCurrent > 0
        ? frameCurrent - 1
        : e.deltaY < 0 && frameCurrent < viewer.base - 1
          ? frameCurrent + 1
          : frameCurrent

    viewer.setPlaneFrameActive({ dimension, frame: frameNew })
  }

  function inChange (e) {
    viewer.setPlaneFrameActive({ dimension, frame: e.target.value })
  }

  return (
    <div>
      <canvas
        className={`plane-canvas-${dimension}`}
        data-testid={`plane-canvas-${dimension}`}
        height={viewer.base}
        onClick={onClick}
        onContextMenu={onClick}
        onWheel={onWheel}
        ref={canvasRef}
        width={viewer.base}
      />
      <input
        data-testid={`plane-input-${dimension}`}
        min='0'
        max={viewer.base - 1}
        orient='vertical'
        onChange={inChange}
        type='range'
        value={frame}
      />
    </div>
  )
}

Plane.propTypes = {
  annotations: object,
  dimension: number,
  tool: object,
  viewer: object
}
