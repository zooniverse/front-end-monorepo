import { forwardRef } from 'react';
import PropTypes from 'prop-types'
import { ParentSize } from '@visx/responsive'
import ZoomingScatterPlot from './components/ZoomingScatterPlot'
import ScatterPlot from './components/ScatterPlot'
import ZoomControlButton from '../ZoomControlButton'

function DataSeriesControls ({ data }) {
  return (
    <ul className='ScatterPlotViewer-DataSeriesControls'>
      {data?.map((dataSeries, index) => (
        <li key={`TODO-${index}`}>{dataSeries.seriesOptions?.label?.trim() || `series ${index+1}`}</li>
      ))}
    </ul>
  )
}

const ScatterPlotViewer = forwardRef(function ScatterPlotViewer (props, ref) {
  const {
    zoomControlFn,
    zooming = false
  } = props

  // Is zooming enabled for this scatter plot?
  const Plot = (zooming) ? ZoomingScatterPlot : ScatterPlot

  // Is this a multi-series data set?
  // If it is, we'll show additional controls for showing/hiding and labelling
  // each data series.
  const indexesToHide = []
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

  return (
    <ParentSize>
      {(parent) => (
        <>
          {zoomControlFn && (
            <ZoomControlButton onClick={zoomControlFn} position='absolute' zooming={zooming} />
          )}
          {isMultiSeriesData && (
            <DataSeriesControls
              data={data}
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
