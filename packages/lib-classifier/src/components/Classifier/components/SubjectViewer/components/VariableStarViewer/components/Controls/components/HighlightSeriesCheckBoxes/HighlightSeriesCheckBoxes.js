import React from 'react'
import PropTypes from 'prop-types'
import { Box, CheckBox } from 'grommet'
import { withTheme } from 'styled-components'
import Label from '../Label'

function HighlightSeriesCheckBoxes (props) {
  const {
    data,
    highlightedSeries,
    setSeriesHighlight,
    theme: {
      global: {
        colors
      }
    }
  } = props

  return (
    <Box direction='column' pad='none'>
      {highlightedSeries.map((series, seriesIndex) => {
        const [[label, checked]] = Object.entries(series)
        const seriesOptions = data[seriesIndex]?.seriesOptions

        return (
          <CheckBox
            checked={checked}
            key={`${label}-${seriesIndex}`}
            label={
              <Label
                colors={colors}
                checked={checked}
                label={label}
                seriesIndex={seriesIndex}
                seriesOptions={seriesOptions}
                highlighted={checked}
              />
            }
            name='series-highlight'
            onChange={event => { setSeriesHighlight(event) }}
            type='checkbox'
            value={label}
          />
        )
      })}
    </Box>
  )
}

HighlightSeriesCheckBoxes.defaultProps = {
  setSeriesHighlight: () => {},
  theme: {
    global: {
      colors: {
        drawingTools: {}
      }
    }
  }
}

HighlightSeriesCheckBoxes.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    seriesData: PropTypes.array,
    seriesOptions: PropTypes.object
  })).isRequired,
  highlightedSeries: PropTypes.arrayOf(PropTypes.object).isRequired,
  setSeriesHighlight: PropTypes.func,
  theme: PropTypes.object
}

export default withTheme(HighlightSeriesCheckBoxes)
export { HighlightSeriesCheckBoxes }