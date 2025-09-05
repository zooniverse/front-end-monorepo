import { Box } from 'grommet'
import { observer } from 'mobx-react'

import { useStores, useSubjectJSON } from '@hooks'
import BarChartViewer from '@viewers/components/BarChartViewer'
import LightCurveViewer from '@viewers/components/LightCurveViewer'
import ScatterPlotViewer from '@viewers/components/ScatterPlotViewer'
import VariableStarViewer from '@viewers/components/VariableStarViewer'

const viewers = {
  BarChart: BarChartViewer,
  DataSeriesPlot: ScatterPlotViewer,
  TESSLightCurve: LightCurveViewer,
  VariableStarPlots: VariableStarViewer
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
  // data series plots need a fixed parent height.
  const height = type.name === 'DataSeriesPlot' ? '500px' : undefined

  return (
    <Box
      ref={viewer}
      className={type.name}
      height={height}
      width='100%'
    >
      <Viewer
        data={data}
        experimentalSelectionTool
        interactionMode={interactionMode}
        setOnPan={setOnPan}
        setOnZoom={setOnZoom}
        subject={subject}
        zoomConfiguration={zoomConfiguration}
        zooming
        {...chartProps}
        {...props}
      />
    </Box>
  )
}

export default observer(JSONDataViewer)
