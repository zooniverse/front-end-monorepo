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

  const singleImageCanvasProps = {
    enableInteractionLayer,
    frame,
    imgRef,
    invert,
    move,
    naturalHeight,
    naturalWidth,
    onKeyDown,
    rotation,
    src,
    subject
  }

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
        {title?.id && title?.text && (
          <title id={title.id}>{title.text}</title>
        )}
        <StyledSVG
          $maxHeight={maxHeight}
          $maxWidth={maxWidth}
          viewBox={`0 0 ${naturalWidth} ${naturalHeight}`}
        >
          <VisXZoom
            height={naturalHeight}
            panning={panning}
            setOnPan={setOnPan}
            setOnZoom={setOnZoom}
            width={naturalWidth}
            zoomConfiguration={DEFAULT_ZOOM_CONFIG}
            zoomingComponent={SingleImageCanvas}
            zooming={zooming}
            {...singleImageCanvasProps}
          />
        </StyledSVG>
      </Box>
    </>
  )
}

SingleImageViewer.propTypes = {
  enableInteractionLayer: bool,
  enableRotation: func,
  frame: number,
  imgRef: shape({
    current: shape({
      naturalHeight: number,
      naturalWidth: number,
      src: string
    })
  }),
  invert: bool,
  limitSubjectHeight: bool,
  move: bool,
  naturalHeight: number,
  naturalWidth: number,
  onKeyDown: func,
  panning: bool,
  rotation: number,
  setOnPan: func,
  setOnZoom: func,
  src: string,
  subject: shape({
    locations: arrayOf(shape({
      url: string
    }))
  }),
  title: shape({
    id: string,
    text: string
  }),
  zoomControlFn: func,
  zooming: bool
}

export default SingleImageViewer
