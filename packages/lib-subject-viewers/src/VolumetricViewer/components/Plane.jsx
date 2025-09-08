import { Box } from 'grommet'
import { FormUp, FormDown } from 'grommet-icons'
import { number, object } from 'prop-types'
import { pointColor } from '../helpers/pointColor.js'
import { Slider } from './Slider'
import styled, { css } from 'styled-components'
import { useEffect, useId, useRef, useState } from 'react'

const BACKGROUND_COLOR = '#000'
const CANVAS_WIDTH = 330
const SLIDER_WIDTH = 60

const StyledBox = styled(Box)`
  ${props => props.theme.dark
    ? css`background-color: #404040;`
    : css`background-color: #EFF2F5;`
  }

  border-radius: 16px;
  margin-bottom: 20px;
  width: 390px;

  button {
    border: none;
  }

  &.expanded {
    border-bottom-right-radius: 0px;
  }

  &.plane-container-0 {
    border: 1px solid #E45950;
  }

  &.plane-container-1 {
    border: 1px solid #06FE76;
  }

  &.plane-container-2 {
    border: 1px solid #235DFF;
  }

  .plane-title {
    ${props => props.theme.dark
      ? css`background: linear-gradient(#5C5C5C, #404040);`
      : css`background: linear-gradient(#FFFFFF, #EFF2F5);`
    }
    align-items: center;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    display: flex;
    flex-direction: row;
    font-size: 24px;
    height: ${SLIDER_WIDTH}px;

    &.collapsed {
      border-bottom-left-radius: 16px;
      border-bottom-right-radius: 16px;
    }

    .plane-title-dimension {
      text-align: center;
      text-transform: uppercase;
      width: ${SLIDER_WIDTH}px;
    }

    .plane-title-frame {
      flex: 1;
      font-size: 16px !important;
      line-height: 18.7px;
      text-align: left;
    }

    .plane-title-label {
      ${props => props.theme.dark
        ? css`color: #E2E5E9;`
        : css`color: ##5C5C5C;`
      }
      font-size: 12px;
      line-height: 12px;
    }

    .plane-title-toggle {
      align-items: center;
      cursor: pointer;
      display: flex;
      margin-right: 10px;
      padding: 6px;
    }
  }

  .plane-content {
    display: flex;
    flex-direction: row;

    .plane-canvas {
      height: ${CANVAS_WIDTH}px;
      transform: translateY(2px);
      width: ${CANVAS_WIDTH}px;
    }
  }
`
export const Plane = ({
  annotations,
  dimension,
  tool,
  viewer
}) => {
  const [hideCoor, setHideCoor] = useState()
  const [expanded, setExpanded] = useState(false)
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0)
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const planeId = useId();

  // Offscreen Canvas for fast rendering
  const frameCanvas = document.createElement('canvas')
  frameCanvas.width = viewer.base
  frameCanvas.height = viewer.base

  // State Change Management through useEffect()
  useEffect(() => {
    // Default open the X/0 frame
    setHideCoor(dimension !== 0)
    setExpanded(dimension === 0)
    drawFrame()

    // State Listeners to bypass React rerenders
    if (annotations) {
      annotations.on('active:annotation', drawFrame)
      annotations.on('add:annotation', drawFrame)
      annotations.on('update:annotation', drawFrame)
    }
    viewer.on(`change:dimension-${dimension}:frame`, drawFrame)
    viewer.on('change:threshold', drawFrame)

    return () => {
      if (annotations) {
        annotations.off('active:annotation', drawFrame)
        annotations.off('add:annotation', drawFrame)
        annotations.off('update:annotation', drawFrame)
      }
      viewer.off(`change:dimension-${dimension}:frame`, drawFrame)
      viewer.off('change:threshold', drawFrame)
    }
  }, [])

  useEffect(() => {
    if (expanded) drawFrame()
  }, [expanded])

  // Functions that do the actual work
  async function drawFrame (e) {
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
      resizeWidth: CANVAS_WIDTH,
      resizeHeight: CANVAS_WIDTH,
      resizeQuality: 'pixelated'
    })

    canvasRef.current?.getContext('2d').drawImage(data, 0, 0)

    // update frame index
    setCurrentFrameIndex(viewer.getPlaneFrameIndex({ dimension }))
  }

  function drawPoint ({ context, point, x, y }) {
    const annotationIndex = viewer.getPointAnnotationIndex({ point })

    // Draw points that are not in threshold same color as background
    if (viewer.isPointInThreshold({ point }) || annotationIndex !== -1) {
      // isInactive makes all inactive marks less visible
      const isInactive = (annotationIndex === -1)
        ? false
        : (annotations?.config.activeAnnotation !== annotationIndex)

      context.fillStyle = pointColor({
        annotationIndex,
        isInactive,
        pointValue: viewer.getPointValue({ point }),
        threshold: viewer.threshold,
      })
    } else {
      context.fillStyle = BACKGROUND_COLOR
    }
    context.fillRect(x, y, 1, 1)
  }

  // Interaction Functions
  function toggleContentVisibility () {
    setHideCoor(false)
    setExpanded(!expanded)
  }

  function onClick (e) {
    if (!tool?.events.click) return // no tool, no interaction on click

    const { button, clientX, clientY, shiftKey } = e
    const { left, top } = canvasRef.current.getBoundingClientRect()
    const pixelLength = CANVAS_WIDTH / viewer.base

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
    const frameCurrent = viewer.getPlaneFrameIndex({ dimension })
    const frameNew =
      e.deltaY > 0 && frameCurrent > 0
        ? frameCurrent - 1
        : e.deltaY < 0 && frameCurrent < viewer.base - 1
          ? frameCurrent + 1
          : frameCurrent

    viewer.setPlaneFrameActive({ dimension, frame: frameNew })
  }

  return (
    <StyledBox className={`plane-container plane-container-${dimension} ${expanded ? 'expanded' : 'collapsed'} no-select`} ref={containerRef}>
      <button
        aria-controls={`section-${planeId}`}
        aria-expanded={expanded.toString()}
        aria-label={`Toggle ${viewer.dimensions[dimension]} Plane Visibility`}
        className={`plane-title ${expanded ? 'expanded' : 'collapsed'}`}
        id={`accordion-${planeId}`}
        onClick={toggleContentVisibility}
        type="button"
      >
        <Box className='plane-title-dimension'>{viewer.getDimensionLabel({ dimension })}</Box>
        <Box className={`plane-title-frame`}>{hideCoor ? '' : currentFrameIndex}</Box>
        <Box className='plane-title-label'>
          {expanded ? 'Collapse' : 'Expand'}
        </Box>
        <div className='plane-title-toggle'>
          {expanded ? <FormUp /> : <FormDown />}
        </div>
      </button>
      {expanded &&
        <Box
          aria-labelledby={`accordion-${planeId}`}
          className='plane-content'
          id={`section-${planeId}`}
          role="region"
        >
          <Slider
            dimension={dimension}
            viewer={viewer}
          />
          <Box className='plane-canvas'>
            <canvas
              className={`plane-${dimension}`}
              data-testid={`plane-${dimension}`}
              height={CANVAS_WIDTH}
              onClick={onClick}
              onContextMenu={onClick}
              onWheel={onWheel}
              ref={canvasRef}
              width={CANVAS_WIDTH}
            />
          </Box>
        </Box>}
    </StyledBox>
  )
}

Plane.propTypes = {
  annotations: object,
  dimension: number,
  tool: object,
  viewer: object
}
