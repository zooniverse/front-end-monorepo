import zooTheme from '@zooniverse/grommet-theme'
import { Box } from 'grommet'
import { observer } from 'mobx-react'
import { darken } from 'polished'

import { useStores, useSubjectJSON } from '@hooks'
import BarChartViewer from '@viewers/components/BarChartViewer/BarChartViewer'
import ScatterPlotViewer from '@viewers/components/ScatterPlotViewer/ScatterPlotViewer'

const viewers = {
  BarChart: BarChartViewer,
  DataSeriesPlot: ScatterPlotViewer,
  TESSLightCurve: ScatterPlotViewer
}

function storeMapper(classifierStore) {
  const {
    subjects: {
      active: subject
    },
    subjectViewer: {
      setOnZoom,
      setOnPan
    }
  } = classifierStore

  return {
    setOnZoom,
    setOnPan,
    subject
  }
}

const DEFAULT_HANDLER = () => true

const { colors } = zooTheme.global
const TESSChartOptions = {
  axisColor: colors['light-1'],
  backgroundColor: darken(0.08, colors['neutral-1']),
  color: colors['light-1'],
  margin: {
    bottom: 10,
    left: 10,
    right: 10,
    top: 10
  },
  padding: {
    bottom: 30,
    left: 30,
    right: 0,
    top: 0
  },
  tickDirection: 'inner',
  xAxisLabel: 'Days',
  yAxisLabel: 'Brightness',
  zoomConfiguration: {
    direction: 'x',
    minZoom: 1,
    maxZoom: 10,
    zoomInValue: 1.2,
    zoomOutValue: 0.8
  }
}

function JSONDataViewer({
  onError = DEFAULT_HANDLER,
  onReady = DEFAULT_HANDLER,
  ...props
}) {
  const { subject, setOnPan, setOnZoom } = useStores(storeMapper)
  const { data: jsonData, loading, error, type, viewer } = useSubjectJSON({ onError, onReady, subject})

  if (loading) {
    return null
  }
  if (error) {
    return <p>{ error.message }</p>
  }

  const Viewer = viewers[type.name]
  const { chartOptions, data } = type.name === 'TESSLightCurve' ?
    { chartOptions: TESSChartOptions, data: jsonData } :
    jsonData
  const zoomConfiguration = chartOptions?.zoomConfiguration || subject?.viewerConfiguration?.zoomConfiguration
  const chartProps = { ...chartOptions, zoomConfiguration }

  return (
    <Box ref={viewer} width='100%' height='500px'>
      <Viewer
        data={data}
        setOnPan={setOnPan}
        setOnZoom={setOnZoom}
        zoomConfiguration={zoomConfiguration}
        zooming
        {...chartProps}
        {...props}
      />
    </Box>
  )
}

export default observer(JSONDataViewer)
