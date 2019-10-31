import React from 'react'
import PropTypes from 'prop-types'
import ZoomingScatterPlot from './components/ZoomingScatterPlot'
import ScatterPlot from './components/ScatterPlot'

const ScatterPlotViewer = React.forwardRef(function ScatterPlotViewer (props, ref) {
  const {
    zooming
  } = props

  if (zooming) {
    return (
      <ZoomingScatterPlot {...props} forwardedRef={ref} />
    )
  }
  return (
    <ScatterPlot forwardedRef={ref} />
  )
})

ScatterPlotViewer.defaultProps = {
  zooming: false
}

ScatterPlotViewer.propTypes = {
  zooming: PropTypes.bool
}

export default ScatterPlotViewer
