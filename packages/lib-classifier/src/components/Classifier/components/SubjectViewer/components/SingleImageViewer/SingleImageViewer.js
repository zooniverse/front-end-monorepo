import PropTypes from 'prop-types'
import React, { createRef, forwardRef, useContext } from 'react'
import SVGContext from '@plugins/drawingTools/shared/SVGContext'
import { Box } from 'grommet'
import InteractionLayer from '../InteractionLayer'
import ZoomControlButton from '../ZoomControlButton'

const SingleImageViewer = forwardRef(function SingleImageViewer(props, ref) {
  const {
    children,
    enableInteractionLayer,
    height,
    onKeyDown,
    rotate,
    scale,
    title,
    viewBox,
    width,
    zoomControlFn,
    zooming
  } = props

  const transformLayer = createRef()
  const { svg } = useContext(SVGContext)
  const transform = `rotate(${rotate} ${width / 2} ${height / 2})`
  const getScreenCTM = () => transformLayer.current.getScreenCTM()

  return (
    <SVGContext.Provider value={{ svg, getScreenCTM }}>
      {zoomControlFn && (
        <ZoomControlButton onClick={zoomControlFn} zooming={zooming} />
      )}
      <Box animation='fadeIn' overflow='hidden'>
        <svg
          ref={ref}
          focusable
          onKeyDown={onKeyDown}
          tabIndex={0}
          viewBox={viewBox}
        >
          {title?.id && title?.text && (
            <title id={title.id}>{title.text}</title>
          )}
          <g ref={transformLayer} transform={transform}>
            {children}
            {enableInteractionLayer && (
              <InteractionLayer scale={scale} height={height} width={width} />
            )}
          </g>
        </svg>
      </Box>
    </SVGContext.Provider>
  )
})

SingleImageViewer.propTypes = {
  enableInteractionLayer: PropTypes.bool,
  height: PropTypes.number.isRequired,
  onKeyDown: PropTypes.func,
  rotate: PropTypes.number,
  scale: PropTypes.number,
  title: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string
  }),
  viewBox: PropTypes.string,
  width: PropTypes.number.isRequired,
  zoomControlFn: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  zooming: PropTypes.bool
}

SingleImageViewer.defaultProps = {
  enableInteractionLayer: true,
  onKeyDown: () => true,
  rotate: 0,
  scale: 1,
  title: {},
  zoomControlFn: null,
  zooming: false
}

export default SingleImageViewer
