import { Box } from 'grommet'
import PropTypes from 'prop-types'
import { useRef } from 'react'
import styled, { css } from 'styled-components'

import SVGContext from '@plugins/drawingTools/shared/SVGContext'
import InteractionLayer from '../InteractionLayer'
import ZoomControlButton from '../ZoomControlButton'
import locationValidator from '../../helpers/locationValidator'

const PlaceholderSVG = styled.svg`
  background: no-repeat center / contain url('https://static.zooniverse.org/www.zooniverse.org/assets/fe-project-subject-placeholder-800x600.png');
  touch-action: pinch-zoom;
  max-width: ${props => props.maxWidth || '100%'};
  ${props => props.maxHeight && css`max-height: ${props.maxHeight};`}
`

function SingleImageViewer({
  children,
  enableInteractionLayer = true,
  height,
  limitSubjectHeight = false,
  onKeyDown = () => true,
  rotate = 0,
  scale = 1,
  svgMaxHeight = null,
subject,
  title = {},
  viewBox,
  width,
  zoomControlFn = null,
  zooming = false
}) {
  const transformLayer = useRef()
  const canvas = transformLayer.current
  const transform = `rotate(${rotate} ${width / 2} ${height / 2})`

  return (
    <SVGContext.Provider value={{ canvas, viewBox, rotate, width, height }}>
      {zoomControlFn && (
        <ZoomControlButton
          onClick={zoomControlFn}
          zooming={zooming}
        />
      )}
      <Box
        animation='fadeIn'
        overflow='hidden'
        width='100%'
        align='flex-end'
      >
        <PlaceholderSVG
          focusable
          maxHeight={svgMaxHeight}
          maxWidth={limitSubjectHeight ? `${width}px` : '100%'}
          onKeyDown={onKeyDown}
          tabIndex={0}
          viewBox={viewBox}
          xmlns='http://www.w3.org/2000/svg'
        >
          {title?.id && title?.text && (
            <title id={title.id}>{title.text}</title>
          )}
          <g
            ref={transformLayer}
            transform={transform}
          >
            {children}
            {enableInteractionLayer && (
              <InteractionLayer
                scale={scale}
                height={height}
                width={width}
                subject={subject}
              />
            )}
          </g>
        </PlaceholderSVG>
      </Box>
    </SVGContext.Provider>
  )
}

SingleImageViewer.propTypes = {
  /** Passed from container */
  enableInteractionLayer: PropTypes.bool,
  /** Calculated by useSubjectImage() */
  height: PropTypes.number.isRequired,
  /** Stored in subject viewer store */
  rotate: PropTypes.number,
  /** Calculated in SVGPanZoom component */
  scale: PropTypes.number,
  /** Calculated in SVGPanZoom component */
  svgMaxHeight: PropTypes.string,
  /** Passed from container */
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(locationValidator)
  }),
  title: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string
  }),
  /** Calculated in SVGPanZoom component */
  viewBox: PropTypes.string,
  /** Calculated by useSubjectImage() */
  width: PropTypes.number.isRequired,
  /** Stored in subject viewer store */
  zoomControlFn: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  /** Passed from container */
  zooming: PropTypes.bool
}

export default SingleImageViewer
