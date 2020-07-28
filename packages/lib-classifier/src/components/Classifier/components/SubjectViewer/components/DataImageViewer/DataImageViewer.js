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
    subjectJSON,
    theme
  } = props

  return (
    <Box
      direction='row'
      ref={ref}
    >
      <ScatterPlotViewer
        data={subjectJSON.data}
        xAxisLabel={subjectJSON.chartOptions?.xAxisLabel}
        yAxisLabel={subjectJSON.chartOptions?.yAxisLabel}
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
  subjectJSON: {
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
  rawJSON: PropTypes.shape({
    data: PropTypes.array,
    chartOptions: PropTypes.object
  }),
  theme: PropTypes.object
}

export default withTheme(DataImageViewer)
export { DataImageViewer }