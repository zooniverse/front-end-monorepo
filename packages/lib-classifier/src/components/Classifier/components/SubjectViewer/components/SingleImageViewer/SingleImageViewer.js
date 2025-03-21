import { Box } from 'grommet'
import { arrayOf, bool, func, number, shape, string } from 'prop-types'
import { useEffect } from 'react'
import styled, { css } from 'styled-components'

import ZoomControlButton from '../ZoomControlButton'

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
  useEffect(function onMount() {
    enableRotation()
  }, [])


  const maxHeight = limitSubjectHeight ? `min(${naturalHeight}px, 90vh)` : null
  const maxWidth = limitSubjectHeight ? `${naturalWidth}px` : '100%'

  return (
    <>
      {zoomControlFn && (
        <ZoomControlButton
          onClick={zoomControlFn}
          zooming={zooming}
        />
      )}
      <Box
        align='flex-end'
        animation='fadeIn'
        overflow='hidden'
        width='100%'
      >
        <StyledSVG
          aria-labelledby={title?.id}
          $maxHeight={maxHeight}
          $maxWidth={maxWidth}
          viewBox={`0 0 ${naturalWidth} ${naturalHeight}`}
        >
          {title?.id && title?.text && (
            <title id={title.id}>{title.text}</title>
          )}
          <VisXZoom
            allowsScrolling
            height={naturalHeight}
            move={move}
            onKeyDown={onKeyDown}
            panning={panning}
            setOnPan={setOnPan}
            setOnZoom={setOnZoom}
            width={naturalWidth}
            zoomConfiguration={DEFAULT_ZOOM_CONFIG}
            zooming={zooming}
          >
            <SingleImageCanvas
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
          </VisXZoom>
        </StyledSVG>
      </Box>
    </>
  )
}

SingleImageViewer.propTypes = {
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
