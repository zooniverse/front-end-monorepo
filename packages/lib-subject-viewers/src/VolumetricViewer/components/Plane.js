import { Box } from 'grommet'
import { FormUp, FormDown } from 'grommet-icons'
import { number, object } from 'prop-types'
import { pointColor } from './../helpers/pointColor.js'
import { Slider } from './Slider'
import styled, { css } from 'styled-components'
import { useEffect, useRef, useState } from 'react'

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
    line-height: 28px;

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
      cursor: pointer;
      min-width: ${SLIDER_WIDTH}px;
      padding-top: 3px;
      text-align: center;
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
  // Default open the X/0 frame
  const [expanded, setExpanded] = useState(dimension === 0)
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0)
  const canvasRef = useRef(null)
  const containerRef = useRef(null)

  // Offscreen Canvas for fast rendering
  const frameCanvas = document.createElement('canvas')
  frameCanvas.width = viewer.base
  frameCanvas.height = viewer.base

  // State Change Management through useEffect()
  useEffect(() => {
    drawFrame()

    // State Listeners to bypass React rerenders
    annotations.on('add:annotation', drawFrame)
    annotations.on('update:annotation', drawFrame)
    annotations.on('remove:annotation', drawFrame)
    viewer.on(`change:dimension-${dimension}:frame`, drawFrame)
    viewer.on('change:threshold', drawFrame)

    return () => {
      annotations.off('add:annotation', drawFrame)
      annotations.off('update:annotation', drawFrame)
      annotations.off('remove:annotation', drawFrame)
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
  function toggleContentVisibility () {
    setExpanded(!expanded)
  }

  function onClick (e) {
    if (!tool.events.click) return // no tool, no interaction on click

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
    <StyledBox className={`plane-container plane-container-${dimension} ${expanded ? 'expanded' : 'collapsed'}`} ref={containerRef}>
      <Box className={`plane-title ${expanded ? 'expanded' : 'collapsed'}`}>
        <Box className='plane-title-dimension'>{viewer.getDimensionLabel({ dimension })}</Box>
        <Box className={`plane-title-frame`}>{expanded ? currentFrameIndex : ' '}</Box>
        <Box className='plane-title-label'>
          {expanded ? 'Collapse' : 'Expand'}
        </Box>
        <div className='plane-title-toggle' onClick={toggleContentVisibility}>
          {expanded ? <FormUp /> : <FormDown />}
        </div>
      </Box>
      {expanded &&
        <Box className='plane-content'>
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
