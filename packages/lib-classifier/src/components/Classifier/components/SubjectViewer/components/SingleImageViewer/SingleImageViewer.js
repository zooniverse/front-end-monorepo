import { Box } from 'grommet'
import PropTypes from 'prop-types'
import { useRef } from 'react'

import SVGContext from '@plugins/drawingTools/shared/SVGContext'
import InteractionLayer from '../InteractionLayer'
import ZoomControlButton from '../ZoomControlButton'

function SingleImageViewer (props) {
  const {
    children,
    enableInteractionLayer = true,
    height,
    limitSubjectHeight = false,
    onKeyDown = () => true,
    rotate = 0,
    scale = 1,
    svgMaxHeight = null,
    title = {},
    viewBox,
    width,
    zoomControlFn = null,
    zooming = false
  } = props
  const transformLayer = useRef()
  const canvas = transformLayer.current
  const transform = `rotate(${rotate} ${width / 2} ${height / 2})`

  return (
    <SVGContext.Provider value={{ canvas }}>
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
        align={limitSubjectHeight ? 'flex-end' : 'center'}
      >
        <svg
          focusable
          onKeyDown={onKeyDown}
          style={{
            touchAction: enableInteractionLayer ? 'pinch-zoom' : 'unset',
            maxHeight: svgMaxHeight,
            maxWidth: limitSubjectHeight ? `${width}px` : '100%'
          }}
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
              />
            )}
          </g>
        </svg>
      </Box>
    </SVGContext.Provider>
  )
}

SingleImageViewer.propTypes = {
  /** Passed from container */
  enableInteractionLayer: PropTypes.bool,
  /** Calculated by useSubjectImage() */
  height: PropTypes.number.isRequired,
  /** Passed from withKeyZoom() */
  onKeyDown: PropTypes.func,
  /** Stored in subject viewer store */
  rotate: PropTypes.number,
  /** Calculated in SVGPanZoom component */
  scale: PropTypes.number,
  /** Calculated in SVGPanZoom component */
  svgMaxHeight: PropTypes.string,
  /** Passed from container */
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
