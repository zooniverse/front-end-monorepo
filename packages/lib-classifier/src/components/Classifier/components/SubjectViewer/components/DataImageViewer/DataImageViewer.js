import React from 'react'
import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'
import {
  Box,
  Grid
} from 'grommet'
import { ScatterPlotViewer } from '../ScatterPlotViewer'
import { SingleImageViewerContainer } from '../SingleImageViewer'
import getZoomBackgroundColor from '@viewers/helpers/getZoomBackgroundColor'

const StyledBox = styled(Box)`
  position: relative;
`

const DataImageViewer = React.forwardRef(function DataImageViewer(props, ref) {
  const {
    allowPanZoom,
    enableRotation,
    imageLocation,
    JSONData,
    move,
    resetView,
    rotation,
    setAllowPanZoom,
    setOnPan,
    setOnZoom,
    theme: {
      dark,
      global: {
        colors
      }
    }
  } = props
  const zoomEnabled = {
    image: allowPanZoom === 'image',
    scatterPlot: allowPanZoom === 'scatterPlot'
  }
  const imageViewerBackground = getZoomBackgroundColor(dark, zoomEnabled.image, colors)

  function disableImageZoom () {
    resetView()
    setAllowPanZoom('')
  }

  return (
    <Grid
      areas={[ 
        { name: 'scatterPlot', start: [0, 0], end: [0, 0]},
        { name: 'image', start: [1, 0], end: [1, 0]}
      ]}
      columns={['1/2', '1/2']}
      fill
      forwardedRef={ref}
      gap='xsmall'
      pad={{ horizontal: 'xsmall' }}
      rows={['full']}
    >
      <StyledBox
        border={zoomEnabled.scatterPlot && { color: 'brand', size: 'xsmall' }}
        gridArea='scatterPlot'
      >
        <ScatterPlotViewer
          data={JSONData.data}
          margin={{
            bottom: 50,
            left: 60,
            right: 10,
            top: 30
          }}
          setOnPan={setOnPan}
          setOnZoom={setOnZoom}
          xAxisLabel={JSONData.chartOptions?.xAxisLabel}
          yAxisLabel={JSONData.chartOptions?.yAxisLabel}
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

DataImageViewer.defaultProps = {
  allowPanZoom: '',
  imageLocation: null,
  JSONData: {
    data: [],
    chartOptions: {
      xAxisLabel: '',
      yAxisLabel: ''
    }
  },
  resetView: () => {},
  setAllowPanZoom: () => {},
  theme: {
    global: {
      colors: {},
      font: {}
    }
  },
}

DataImageViewer.propTypes = {
  allowPanZoom: PropTypes.string,
  imageLocation: PropTypes.object,
  JSONData: PropTypes.shape({
    data: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
    chartOptions: PropTypes.object
  }),
  resetView: PropTypes.func,
  setAllowPanZoom: PropTypes.func,
  theme: PropTypes.object
}

export default withTheme(DataImageViewer)
export { DataImageViewer }