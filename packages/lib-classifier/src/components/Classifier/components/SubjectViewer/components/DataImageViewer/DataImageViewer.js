import { forwardRef } from 'react';
import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'
import {
  Box,
  Grid
} from 'grommet'
import { withParentSize } from '@visx/responsive'
import { ScatterPlotViewer } from '../ScatterPlotViewer'
import { SingleImageViewerContainer } from '../SingleImageViewer'
import getZoomBackgroundColor from '@viewers/helpers/getZoomBackgroundColor'

const StyledBox = styled(Box)`
  position: relative;
`

const CHART_MARGINS = {
  bottom: 50,
  left: 70,
  right: 10,
  top: 30
}

const JSON_DATA = {
  data: [],
  chartOptions: {
    xAxisLabel: '',
    yAxisLabel: ''
  }
}

const DEFAULT_HANDLER = () => true

const DEFAULT_THEME = {
  dark: false,
  global: {
    colors: {}
  }
}
const DataImageViewer = forwardRef(function DataImageViewer({
  allowPanZoom = '',
  enableRotation = DEFAULT_HANDLER,
  imageLocation = null,
  jsonData = JSON_DATA,
  loadingState,
  move = false,
  parentWidth,
  resetView = DEFAULT_HANDLER,
  rotation = 0,
  setAllowPanZoom = DEFAULT_HANDLER,
  setOnPan = DEFAULT_HANDLER,
  setOnZoom = DEFAULT_HANDLER,
  theme = DEFAULT_THEME,
  zoomConfiguration
}, ref) {
  const {
    dark,
    global: {
      colors = {}
    }
  } = theme
  const { chartOptions } = jsonData
  const zoomEnabled = {
    image: allowPanZoom === 'image',
    scatterPlot: allowPanZoom === 'scatterPlot'
  }
  const imageViewerBackground = getZoomBackgroundColor(dark, zoomEnabled.image, colors)
  const areas = (parentWidth <= 500) ?
    [
      { name: 'scatterPlot', start: [0, 0], end: [0, 0] },
      { name: 'image', start: [0, 1], end: [0, 1] }
    ] :
    [
      { name: 'scatterPlot', start: [0, 0], end: [0, 0] },
      { name: 'image', start: [1, 0], end: [1, 0] }
    ] 
  const columns = (parentWidth <= 500) ? ['full'] : ['1/2', '1/2']
  const rows = (parentWidth <= 500) ? ['auto', 'auto'] : ['full']

  function disableImageZoom () {
    resetView()
    setAllowPanZoom('')
  }

  /*
    PH-TESS light curves use jsonData.x and jsonData.y.
    SuperWASP Black Hole Hunters use jsonData.data.x and jsonData.data.y
  */
  const data = jsonData.data ? jsonData.data : jsonData
  return (
    <Grid
      areas={areas}
      columns={columns}
      fill
      forwardedRef={ref}
      gap='xsmall'
      pad={{ horizontal: 'xsmall' }}
      rows={rows}
    >
      <StyledBox
        border={zoomEnabled.scatterPlot && { color: 'brand', size: 'xsmall' }}
        gridArea='scatterPlot'
        height='500px'
      >
        <ScatterPlotViewer
          data={data}
          invertAxes={chartOptions?.invertAxes}
          margin={CHART_MARGINS}
          setOnPan={setOnPan}
          setOnZoom={setOnZoom}
          xAxisLabel={chartOptions?.xAxisLabel}
          yAxisLabel={chartOptions?.yAxisLabel}
          yAxisLabelOffset={50}
          zoomConfiguration={zoomConfiguration}
          zoomControlFn={(zoomEnabled.scatterPlot) ? () => setAllowPanZoom('') : () => setAllowPanZoom('scatterPlot')}
          zooming={zoomEnabled.scatterPlot}
        />
      </StyledBox>
      <Box
        background={imageViewerBackground}
        border={(zoomEnabled.image) && { color: 'brand', size: 'xsmall' }}
        gridArea='image'
      >
        {imageLocation &&
          <SingleImageViewerContainer
            enableInteractionLayer={false}
            enableRotation={enableRotation}
            loadingState={loadingState}
            move={move}
            rotation={rotation}
            subject={{
              locations: [
                imageLocation
              ]
            }}
            setOnPan={setOnPan}
            setOnZoom={setOnZoom}
            zoomControlFn={(zoomEnabled.image) ? () => disableImageZoom() : () => setAllowPanZoom('image')}
            zooming={zoomEnabled.image}
          />}
      </Box>
    </Grid>
  )
})



DataImageViewer.propTypes = {
  allowPanZoom: PropTypes.string,
  enableRotation: PropTypes.func,
  imageLocation: PropTypes.object,
  jsonData: PropTypes.shape({
    data: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
    chartOptions: PropTypes.object
  }),
  move: PropTypes.bool,
  parentWidth: PropTypes.number,
  resetView: PropTypes.func,
  rotation: PropTypes.number,
  setAllowPanZoom: PropTypes.func,
  setOnPan: PropTypes.func,
  setOnZoom: PropTypes.func,
  theme: PropTypes.object
}

export default withTheme(withParentSize(DataImageViewer))
export { DataImageViewer }