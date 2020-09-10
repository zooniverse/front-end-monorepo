import React from 'react'
import PropTypes from 'prop-types'
import { Box, RadioButton } from 'grommet'
import { withTheme } from 'styled-components'
import Label from '../Label'
import counterpart from 'counterpart'
import en from '../../../../locales/en'

counterpart.registerTranslations('en', en)

function PhaseFocusControls(props) {
  const {
    data,
    phaseFocusedSeries,
    setSeriesPhaseFocus,
    theme: {
      global: {
        colors
      }
    }
  } = props

  return (
    <Box direction='column'  pad='none'>
      {data.map((series, seriesIndex) => {
        const { seriesOptions } = series
        const checked = phaseFocusedSeries === seriesIndex
        const label = seriesOptions?.label || counterpart('VariableStarViewer.label', { id: seriesIndex + 1 })

        return (
          <RadioButton
            checked={checked}
            key={`${label}-${seriesIndex}`}
            label={
              <Label
                colors={colors}
                seriesIndex={seriesIndex}
                seriesOptions={seriesOptions}
                label={label}
              />
            }
            name='series-phase-focus'
            onChange={event => { setSeriesPhaseFocus(event) }}
            type='radio'
            value={seriesIndex.toString()}
          />
        )
      })}
    </Box>
  )
}

PhaseFocusControls.defaultProps = {
  setSeriesPhaseFocus: () => { },
  theme: {
    global: {
      colors: {
        drawingTools: {}
      }
    }
  }
}

PhaseFocusControls.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    seriesData: PropTypes.array,
    seriesOptions: PropTypes.object
  })).isRequired,
  phaseFocusedSeries: PropTypes.number.isRequired,
  setSeriesPhaseFocus: PropTypes.func,
  theme: PropTypes.object
}

export default withTheme(PhaseFocusControls)
export { PhaseFocusControls }
