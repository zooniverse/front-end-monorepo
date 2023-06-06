import { forwardRef } from 'react';
import PropTypes from 'prop-types'
import { withParentSize } from '@visx/responsive'
import ZoomingScatterPlot from './components/ZoomingScatterPlot'
import ScatterPlot from './components/ScatterPlot'
import ZoomControlButton from '../ZoomControlButton'

const ScatterPlotViewer = forwardRef(function ScatterPlotViewer (props, ref) {
  const {
    zoomControlFn,
    zooming
  } = props
  const Plot = (zooming) ? ZoomingScatterPlot : ScatterPlot

  return (
    <>
      {zoomControlFn &&
        <ZoomControlButton onClick={zoomControlFn} position='absolute' zooming={zooming} />}
      <Plot
        forwardedRef={ref}
        {...props}
      />
    </>
  )
})

ScatterPlotViewer.defaultProps = {
  zooming: false
}

ScatterPlotViewer.propTypes = {
  parentHeight: PropTypes.number.isRequired,
  parentWidth: PropTypes.number.isRequired,
  zooming: PropTypes.bool
}

export default withParentSize(ScatterPlotViewer)
export { ScatterPlotViewer }
