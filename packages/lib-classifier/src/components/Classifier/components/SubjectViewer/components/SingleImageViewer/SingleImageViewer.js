import { Box } from 'grommet'
import { bool, func, shape, string } from 'prop-types'
import { useEffect, useState, useRef } from 'react'
import styled, { css } from 'styled-components'

import ZoomControlButton from '../ZoomControlButton'
import ZoomHelperOverlay from './components/ZoomHelperOverlay'
import VisXZoom from '../SVGComponents/VisXZoom'
import SingleImageCanvas from './SingleImageCanvas'

const StyledSVG = styled.svg`
  background-color: ${props => props.theme.global.colors['light-4']};
  touch-action: pinch-zoom;
  max-width: ${props => props.$maxWidth};
  ${props => props.$maxHeight && css`max-height: ${props.$maxHeight};`}
`

const DEFAULT_HANDLER = () => true
const DEFAULT_ZOOM_CONFIG = {
  direction: 'both',
  maxZoom: 10,
  minZoom: 0.1,
  onWheelThrottleWait: 100,
  zoomInValue: 1.2,
  zoomOutValue: 0.8
}

function SingleImageViewer({
  allowsScrolling = true,
  enableInteractionLayer = true,
  enableRotation = DEFAULT_HANDLER,
  frame = 0,
  imgRef,
  invert = false,
  limitSubjectHeight = false,
  move = false,
  naturalHeight,
  naturalWidth,
  onKeyDown = DEFAULT_HANDLER,
  panning = true,
  rotation = 0,
  setOnPan = DEFAULT_HANDLER,
  setOnZoom = DEFAULT_HANDLER,
  src,
  subject,
  title = undefined,
  zoomControlFn = null,
  zooming = true
}) {
  const styledSVGRef = useRef(null)
  const [svgDimensions, setSvgDimensions] = useState({ width: '100%', height: '100%' })
  
  const [showZoomHelper, setShowZoomHelper] = useState(false)
  const [fadingOut, setFadingOut] = useState(false)

  useEffect(function onMount() {
    enableRotation()
  }, [])

  useEffect(() => {
    // Update dimensions after component has mounted and whenever naturalWidth/Height changes
    if (styledSVGRef.current) {
      const updateDimensions = () => {
        setSvgDimensions({
          width: `${styledSVGRef.current.clientWidth}px`,
          height: `${styledSVGRef.current.clientHeight}px`
        })
      }
      
      updateDimensions()
    }
  }, [naturalWidth, naturalHeight, styledSVGRef])

  // Handle the first scroll event
  const handleFirstScroll = () => {
    if (allowsScrolling && zooming) {
      setShowZoomHelper(true)
      
      // Set fading out after 1.5 seconds
      setTimeout(() => {
        setFadingOut(true)
      }, 1500)
      
      // Hide completely after animation completes (300ms animation)
      setTimeout(() => {
        setShowZoomHelper(false)
        setFadingOut(false)
      }, 1800)
    }
  }

  const maxHeight = limitSubjectHeight ? `min(${naturalHeight}px, 90vh)` : null
  const maxWidth = limitSubjectHeight ? `${naturalWidth}px` : '100%'

  const zoomHelperMessageTop = naturalHeight > naturalWidth ? 280 : 60

  return (
    <>
      {zoomControlFn && (
        <ZoomControlButton onClick={zoomControlFn} zooming={zooming} />
      )}
      <Box
        align='flex-end'
        animation='fadeIn'
        overflow='hidden'
        width='100%'
        position='relative'
      >
        {showZoomHelper && (
          <ZoomHelperOverlay
            fadingOut={fadingOut}
            height={svgDimensions.height}
            width={svgDimensions.width}
            zoomHelperMessageTop={zoomHelperMessageTop}
          />
        )}
        <StyledSVG
          ref={styledSVGRef}
          aria-labelledby={title?.id}
          $maxHeight={maxHeight}
          $maxWidth={maxWidth}
          viewBox={`0 0 ${naturalWidth} ${naturalHeight}`}
        >
          {title?.id && title?.text && (
            <title id={title.id}>{title.text}</title>
          )}
          <VisXZoom
            allowsScrolling={allowsScrolling}
            height={naturalHeight}
            move={move}
            onFirstScroll={handleFirstScroll}
            onKeyDown={onKeyDown}
            panning={panning}
            setOnPan={setOnPan}
            setOnZoom={setOnZoom}
            width={naturalWidth}
            zoomConfiguration={DEFAULT_ZOOM_CONFIG}
            zooming={zooming}
          >
            {(zoomProps) => (
              <SingleImageCanvas
                {...zoomProps}
                enableInteractionLayer={enableInteractionLayer}
                frame={frame}
                imgRef={imgRef}
                invert={invert}
                move={move}
                naturalHeight={naturalHeight}
                naturalWidth={naturalWidth}
                rotation={rotation}
                src={src}
                subject={subject}
              />
            )}
          </VisXZoom>
        </StyledSVG>
      </Box>
    </>
  )
}

SingleImageViewer.propTypes = {
  allowsScrolling: bool,
  enableRotation: func,
  limitSubjectHeight: bool,
  panning: bool,
  setOnPan: func,
  setOnZoom: func,
  title: shape({
    id: string,
    text: string
  }),
  zoomControlFn: func,
  zooming: bool,
  ...SingleImageCanvas.propTypes
}

export default SingleImageViewer
