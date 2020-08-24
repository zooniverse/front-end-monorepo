import React from 'react'
import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'
import {
  Box,
  Grid
} from 'grommet'
import { ScatterPlotViewer } from '../ScatterPlotViewer'
import { SingleImageViewer } from '../SingleImageViewer'

const StyledBox = styled(Box)`
  position: relative;
`

const DataImageViewer = React.forwardRef(function DataImageViewer(props, ref) {
  const {
    allowPanZoom,
    imageSrc,
    JSONData,
    setAllowPanZoom,
    setOnPan,
    setOnZoom,
    theme
  } = props

  const zoomEnabled = {
    image: allowPanZoom === 'image',
    scatterPlot: allowPanZoom === 'scatterPlot'
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
      <Box gridArea='image'>
        <SingleImageViewer
          enableInteractionLayer={false}
        >
          <image xlinkHref={imageSrc} />
        </SingleImageViewer>
      </Box>
    </Grid>
  )
})

DataImageViewer.defaultProps = {
  allowPanZoom: '',
  imageSrc: '',
  JSONData: {
    data: [],
    chartOptions: {
      xAxisLabel: '',
      yAxisLabel: ''
    }
  },
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
  imageSrc: PropTypes.string,
  JSONData: PropTypes.shape({
    data: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
    chartOptions: PropTypes.object
  }),
  setAllowPanZoom: PropTypes.func,
  theme: PropTypes.object
}

export default withTheme(DataImageViewer)
export { DataImageViewer }