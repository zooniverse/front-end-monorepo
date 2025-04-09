import { Box } from 'grommet'
import { bool, func, shape, string } from 'prop-types'
import { useEffect, useState, useRef } from 'react'
import styled, { css } from 'styled-components'

import ZoomControlButton from '../ZoomControlButton'
import ZoomHelperOverlay from './components/ZoomHelperOverlay'
import VisXZoom from '../SVGComponents/VisXZoom'
import SingleImageCanvas from './SingleImageCanvas'

const Relative = styled(Box)`
  position: relative;
`

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
  const [showZoomHelper, setShowZoomHelper] = useState(false)
  const [fadingOut, setFadingOut] = useState(false)

  useEffect(function onMount() {
    enableRotation()
  }, [])

  // Handle the first scroll event
  function handleFirstScroll() {
    if (allowsScrolling && zooming) {
      setShowZoomHelper(true)
      
      // Set fading out after 3 seconds
      setTimeout(() => {
        setFadingOut(true)
      }, 3000)
      
      // Hide completely after animation completes (300ms animation)
      setTimeout(() => {
        setShowZoomHelper(false)
        setFadingOut(false)
      }, 3300)
    }
  }

  const maxHeight = limitSubjectHeight ? `min(${naturalHeight}px, 90vh)` : null
  const maxWidth = limitSubjectHeight ? `${naturalWidth}px` : '100%'

  return (
    <>
      {zoomControlFn && (
        <ZoomControlButton onClick={zoomControlFn} zooming={zooming} />
      )}
      <Relative
        align='flex-end'
        animation='fadeIn'
        overflow='hidden'
        width='100%'
      >
        {showZoomHelper && (
          <ZoomHelperOverlay fadingOut={fadingOut} />
        )}
        <StyledSVG
          aria-labelledby={title?.id}
          aria-describedby={allowsScrolling ? 'scrolling-info' : undefined}
          $maxHeight={maxHeight}
          $maxWidth={maxWidth}
          viewBox={`0 0 ${naturalWidth} ${naturalHeight}`}
        >
          {allowsScrolling && (
            <desc id='scrolling-info'>In pan mode, use CTRL + scroll to zoom.</desc>
          )}
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
      </Relative>
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
