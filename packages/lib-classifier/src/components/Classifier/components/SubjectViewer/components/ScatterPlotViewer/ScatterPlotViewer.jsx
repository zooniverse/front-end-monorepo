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
    zoomControlFn,
    zooming = false,
    showDataSeriesControls = true
  } = props

  // Defines a list of index values in props.data that we DON'T want to show on
  // the scatter plot. For example, if data = [seriesA, seriesB, seriesC] and
  // indexesToHide=[1], then the scatter plot will only show [seriesA, seriesC]
  const [ indexesToHide, setIndexesToHide ] = useState([])

  // Is zooming enabled for this scatter plot?
  const Plot = (zooming) ? ZoomingScatterPlot : ScatterPlot

  // Is this a multi-series data set?
  // If it is, we'll show additional controls for showing/hiding and labelling
  // each data series.
  const { data: fullData } = props
  const isMultiSeriesData = Array.isArray(fullData) && fullData?.length > 1
  const data = (isMultiSeriesData)
    ? fullData.filter((d, index) => !indexesToHide.includes(index))
    : fullData

  // Repackage the props with the (filtered-if-applicable) `data` value.
  const newProps = {
    ...props,
    data
  }

  // If 'index' is in the indexesToHide array, remove it. If not, add it.
  function toggleIndex (index) {
    if (indexesToHide.includes(index)) {
      setIndexesToHide(indexesToHide.filter(d => d !== index))
    } else {
      setIndexesToHide([...indexesToHide, index])
    }
  }

  return (
    <ParentSize>
      {(parent) => (
        <>
          {zoomControlFn && (
            <ZoomControlButton onClick={zoomControlFn} position='absolute' zooming={zooming} />
          )}
          {isMultiSeriesData && showDataSeriesControls && (
            <DataSeriesControls
              fullData={fullData}
              indexesToHide={indexesToHide}
              toggleIndex={toggleIndex}
            />
          )}
          <Plot
            forwardedRef={ref}
            parentHeight={parent.height}
            parentWidth={parent.width}
            {...newProps}
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
