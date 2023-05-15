import zooTheme from '@zooniverse/grommet-theme'
import { Box } from 'grommet'
import { observer } from 'mobx-react'
import { darken } from 'polished'

import { useStores, useSubjectJSON } from '@hooks'
import BarChartViewer from '@viewers/components/BarChartViewer'
import LightCurveViewer from '@viewers/components/LightCurveViewer'
import ScatterPlotViewer from '@viewers/components/ScatterPlotViewer'

const viewers = {
  BarChart: BarChartViewer,
  DataSeriesPlot: ScatterPlotViewer,
  TESSLightCurve: LightCurveViewer
}

function storeMapper(classifierStore) {
  const {
    subjects: {
      active: subject
    },
    subjectViewer: {
      interactionMode,
      setOnZoom,
      setOnPan
    }
  } = classifierStore

  return {
    interactionMode,
    setOnZoom,
    setOnPan,
    subject
  }
}

const DEFAULT_HANDLER = () => true

function JSONDataViewer({
  onError = DEFAULT_HANDLER,
  onReady = DEFAULT_HANDLER,
  ...props
}) {
  const { interactionMode, subject, setOnPan, setOnZoom } = useStores(storeMapper)
  const { data: jsonData, loading, error, type, viewer } = useSubjectJSON({ onError, onReady, subject})

  if (loading) {
    return null
  }
  if (error) {
    return <p>{ error.message }</p>
  }

  const Viewer = viewers[type.name]
  const { chartOptions, data } = type.name === 'TESSLightCurve' ? { data: jsonData } : jsonData
  const zoomConfiguration = chartOptions?.zoomConfiguration || subject?.viewerConfiguration?.zoomConfiguration
  const chartProps = { ...chartOptions, zoomConfiguration }

  return (
    <Box
      ref={viewer}
      className={type.name}
      width='100%'
      height='500px'
    >
      <Viewer
        data={data}
        interactionMode={interactionMode}
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
