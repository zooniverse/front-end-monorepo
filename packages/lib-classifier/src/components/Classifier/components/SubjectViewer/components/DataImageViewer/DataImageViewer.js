import React from 'react'
import PropTypes from 'prop-types'
import { withTheme } from 'styled-components'
import {
  Box,
  Grid
} from 'grommet'
import { ScatterPlotViewer } from '../ScatterPlotViewer'
import { SingleImageViewer } from '../SingleImageViewer'

const DataImageViewer = React.forwardRef(function DataImageViewer(props, ref) {
  const {
    imageSrc,
    JSONData,
    theme
  } = props

  return (
    <Box
      direction='row'
      ref={ref}
    >
      <ScatterPlotViewer
        data={JSONData.data}
        xAxisLabel={JSONData.chartOptions?.xAxisLabel}
        yAxisLabel={JSONData.chartOptions?.yAxisLabel}
      />
      <SingleImageViewer
        enableInteractionLayer={false}
      >
        <image xlinkHref={imageSrc} />
      </SingleImageViewer>
    </Box>
  )
})

DataImageViewer.defaultProps = {
  imageSrc: '',
  JSONData: {
    data: [],
    chartOptions: {
      xAxisLabel: '',
      yAxisLabel: ''
    }
  },
  theme: {
    global: {
      colors: {},
      font: {}
    }
  },
}

DataImageViewer.propTypes = {
  imageSrc: PropTypes.string,
  JSONData: PropTypes.shape({
    data: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
    chartOptions: PropTypes.object
  }),
  theme: PropTypes.object
}

export default withTheme(DataImageViewer)
export { DataImageViewer }