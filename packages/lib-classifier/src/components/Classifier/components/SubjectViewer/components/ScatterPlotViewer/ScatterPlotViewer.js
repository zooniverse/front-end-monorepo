import React from 'react'
import PropTypes from 'prop-types'
import { withParentSize } from '@vx/responsive'
import { withTheme } from 'styled-components'
import ZoomingScatterPlot from './components/ZoomingScatterPlot'
import ScatterPlot from './components/ScatterPlot'

const ScatterPlotViewer = React.forwardRef(function ScatterPlotViewer (props, ref) {
  const {
    zooming
  } = props

  if (zooming) {
    return (
      <ZoomingScatterPlot
        forwardedRef={ref}
        {...props}
      />
    )
  }

  return (
    <ScatterPlot
      forwardedRef={ref}
      {...props}
    />
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
