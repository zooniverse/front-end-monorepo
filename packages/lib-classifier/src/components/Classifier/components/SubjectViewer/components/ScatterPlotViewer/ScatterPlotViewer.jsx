import { forwardRef, useState } from 'react';
import PropTypes from 'prop-types'
import { ParentSize } from '@visx/responsive'
import ZoomingScatterPlot from './components/ZoomingScatterPlot'
import ScatterPlot from './components/ScatterPlot'
import DataSeriesControls from './components/DataSeriesControls'
import ZoomControlButton from '../ZoomControlButton'

const DEFAULT_HANDLER = () => {}

const ScatterPlotViewer = forwardRef(function ScatterPlotViewer (props, ref) {
  const {
    data,
    highlightedSeries = undefined,  // Array of strings (the labels of the data series) OR undefined, indicating which data series should be visible on the chart. This is usually undefined, meaning the state of highlighted series is managed locally by this component and can be used in conjunction with the built-in DataSeriesControls. If this is an array, it means the state is managed by an external component, e.g. VariableStarViewer.
    showDataSeriesControls = true,
    zoomControlFn,
    zooming = false,
  } = props

  const isMultiSeriesData = Array.isArray(data) && data?.length > 1

  // Plan the locally-managed highlighted data series, in case we need it.
  // By the way, it's fine if this value is undefined.
  // The ScatterPlot/ZoomingScatterPlot will treat `undefined` as "highlight all series", and `[]` as "highlight no series".
  const defaultLocalHighlightedSeries = isMultiSeriesData ? data.map(s => s.seriesOptions?.label).filter(Boolean) : undefined
  const [ localHighlightedSeries, setLocalHighlightedSeries ] = useState(defaultLocalHighlightedSeries)

  // Is zooming enabled for this scatter plot?
  const Plot = (zooming) ? ZoomingScatterPlot : ScatterPlot

  // Repackage the props with any locally-managed variables.
  const newProps = {
    ...props,
    highlightedSeries: highlightedSeries ?? localHighlightedSeries,  // If highlightedSeries was provided by an external component, use that. If not, use the locally-managed value.
  }

  // Adds/removes a label from the LOCAL highlightedSeries array.
  // Triggered by DataSeriesControls.
  // If we're using the highlightedSeries provided by an external component,
  // then that external component should manage adding/removing labels. 
  function toggleHighlightedSeries (label) {
    if (!localHighlightedSeries) return 
    
    if (localHighlightedSeries.includes(label)) {
      setLocalHighlightedSeries(localHighlightedSeries.filter(s => s !== label))
    } else {
      setLocalHighlightedSeries([ ...localHighlightedSeries, label ])
    }
  }

  return (
    <ParentSize>
      {(parent) => (
        <>
          {zoomControlFn && (
            <ZoomControlButton onClick={zoomControlFn} position='absolute' zooming={zooming} />
          )}
          <Plot
            forwardedRef={ref}
            parentHeight={parent.height}
            parentWidth={parent.width}
            {...newProps}
          />
          {isMultiSeriesData && showDataSeriesControls && (
            <DataSeriesControls
              data={data}
              highlightedSeries={newProps.highlightedSeries}
              toggleHighlightedSeries={toggleHighlightedSeries}
            />
          )}
        </>
      )}
    </ParentSize>
  )
})

ScatterPlotViewer.propTypes = {
  zooming: PropTypes.bool
}

export default ScatterPlotViewer
