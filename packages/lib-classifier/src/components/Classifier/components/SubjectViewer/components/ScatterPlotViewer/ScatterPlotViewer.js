import { forwardRef } from 'react';
import PropTypes from 'prop-types'
import { withParentSize } from '@visx/responsive'
import { withTheme } from 'styled-components'
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
  theme: {
    global: {
      colors: {},
      font: {}
    }
  },
  zooming: false
}

ScatterPlotViewer.propTypes = {
  parentHeight: PropTypes.number.isRequired,
  parentWidth: PropTypes.number.isRequired,
  theme: PropTypes.object,
  zooming: PropTypes.bool
}

export default withParentSize(withTheme(ScatterPlotViewer))
export { ScatterPlotViewer }
