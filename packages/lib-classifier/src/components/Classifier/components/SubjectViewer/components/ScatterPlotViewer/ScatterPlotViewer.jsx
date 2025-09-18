import { forwardRef } from 'react';
import PropTypes from 'prop-types'
import { ParentSize } from '@visx/responsive'
import ZoomingScatterPlot from './components/ZoomingScatterPlot'
import ScatterPlot from './components/ScatterPlot'
import ZoomControlButton from '../ZoomControlButton'

const ScatterPlotViewer = forwardRef(function ScatterPlotViewer (props, ref) {
  const {
    zoomControlFn,
    zooming = false
  } = props
  const Plot = (zooming) ? ZoomingScatterPlot : ScatterPlot

  return (
    <ParentSize>
      {(parent) => (
        <>
          {zoomControlFn &&
            <ZoomControlButton onClick={zoomControlFn} position='absolute' zooming={zooming} />}
          <Plot
            forwardedRef={ref}
            parentHeight={parent.height}
            parentWidth={parent.width}
            {...props}
          />
        </>
      )}
    </ParentSize>
  )
})

ScatterPlotViewer.propTypes = {
  zooming: PropTypes.bool
}

export default ScatterPlotViewer
