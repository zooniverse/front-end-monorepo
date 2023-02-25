import PropTypes from 'prop-types'
import { createRef, Component } from 'react';
import { Box } from 'grommet'
import ScatterPlotViewer from './ScatterPlotViewer'
import locationValidator from '../../helpers/locationValidator'
import { useScatterPlotSubject } from './hooks'

const DEFAULT_HANDLER = () => true
const SUBJECT = {
  id: '',
  locations: []
}

function ScatterPlotViewerContainer({
  onError = DEFAULT_HANDLER,
  onReady = DEFAULT_HANDLER,
  subject = SUBJECT,
  viewerConfiguration,
  ...rest
}) {
  const { loading, viewer, JSONData } = useScatterPlotSubject({ onError, onReady, subject })
  const { chartOptions, data } = JSONData

  if (!subject.id) {
    return null
  }

  const zoomConfiguration = chartOptions?.zoomConfiguration || viewerConfiguration?.zoomConfiguration

  return (
    <Box ref={viewer} width='100%' height='500px'>
      <ScatterPlotViewer
        data={data}
        invertAxes={chartOptions?.invertAxes}
        margin={chartOptions?.margin}
        padding={chartOptions?.padding}
        xAxisLabel={chartOptions?.xAxisLabel}
        xAxisLabelOffset={chartOptions?.xAxisLabelOffset}
        yAxisLabel={chartOptions?.yAxisLabel}
        yAxisLabelOffset={chartOptions?.yAxisLabelOffset}
        zoomConfiguration={zoomConfiguration}
        zooming
        {...rest}
      />
    </Box>
  )
}

ScatterPlotViewerContainer.propTypes = {
  onError: PropTypes.func,
  onReady: PropTypes.func,
  subject: PropTypes.shape({
    id: PropTypes.string,
    locations: PropTypes.arrayOf(locationValidator)
  })
}

export default ScatterPlotViewerContainer