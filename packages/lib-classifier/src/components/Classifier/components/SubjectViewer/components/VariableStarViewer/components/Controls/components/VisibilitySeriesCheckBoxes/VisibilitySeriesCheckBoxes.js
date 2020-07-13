import React from 'react'
import PropTypes from 'prop-types'
import { Box, CheckBox } from 'grommet'
import styled, { css, withTheme } from 'styled-components'
import { transparentize } from 'polished'
import { SpacedText } from '@zooniverse/react-components'
import Label from '../Label'
import getDataSeriesColor from '../../../../../../helpers/getDataSeriesColor'
import getDataSeriesSymbol from '../../../../../../helpers/getDataSeriesSymbol'

function VisibilitySeriesCheckBoxes (props) {
  const {
    data,
    visibleSeries,
    setSeriesVisibility,
    theme: {
      global: {
        colors
      }
    }
  } = props

  return (
    <Box direction='column' pad='none'>
      {visibleSeries.map((series, seriesIndex) => {
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
                visibleSeries={visibleSeries}
              />
            }
            name='series-visibility'
            onChange={event => { setSeriesVisibility(event) }}
            type='checkbox'
            value={label}
          />
        )
      })}
    </Box>
  )
}

VisibilitySeriesCheckBoxes.defaultProps = {
  setSeriesVisibility: () => {},
  theme: {
    global: {
      colors: {
        drawingTools: {}
      }
    }
  }
}

VisibilitySeriesCheckBoxes.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    seriesData: PropTypes.array,
    seriesOptions: PropTypes.object
  })).isRequired,
  visibleSeries: PropTypes.arrayOf(PropTypes.object).isRequired,
  setSeriesFocus: PropTypes.func,
  theme: PropTypes.object
}

export default withTheme(VisibilitySeriesCheckBoxes)
export { VisibilitySeriesCheckBoxes }