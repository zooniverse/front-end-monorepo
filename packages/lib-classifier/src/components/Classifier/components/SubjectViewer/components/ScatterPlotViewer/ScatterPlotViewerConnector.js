import { useContext } from 'react';
import { MobXProviderContext, observer } from 'mobx-react'
import ScatterPlotViewerContainer from './ScatterPlotViewerContainer'

function useStores() {
  const stores = useContext(MobXProviderContext)

  const {
    active: subject
  } = stores.classifierStore.subjects

  const {
    setOnZoom,
    setOnPan
  } = stores.classifierStore.subjectViewer

  return {
    setOnZoom,
    setOnPan,
    subject
  }
}

function ScatterPlotViewerConnector (props) {
  const {
    setOnPan,
    setOnZoom,
    subject
  } = useStores()

  return (
    <ScatterPlotViewerContainer
      setOnPan={setOnPan}
      setOnZoom={setOnZoom}
      subject={subject}
      {...props}
    />
  )
}

export default observer(ScatterPlotViewerConnector)