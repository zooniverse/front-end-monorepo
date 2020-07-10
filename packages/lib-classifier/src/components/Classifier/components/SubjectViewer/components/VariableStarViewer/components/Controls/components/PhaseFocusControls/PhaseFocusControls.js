import React from 'react'
import PropTypes from 'prop-types'
import { Box } from 'grommet'
import { withTheme } from 'styled-components'
import { transparentize } from 'polished'
import { SpacedText } from '@zooniverse/react-components'
import StyledLabel from '../StyledLabel'
import getDataSeriesColor from '../../../../../../helpers/getDataSeriesColor'
import getDataSeriesSymbol from '../../../../../../helpers/getDataSeriesSymbol'

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
    <Box direction='column' gap='xsmall' pad='none'>
      {data.map((series, seriesIndex) => {
        const checked = phaseFocusedSeries === seriesIndex
        const label = `Filter ${seriesIndex + 1}`
        const { seriesOptions } = series
        const color = getDataSeriesColor({
          defaultColors: Object.values(colors.drawingTools),
          seriesOptions,
          seriesIndex,
          themeColors: colors
        })
        const Glyph = getDataSeriesSymbol(seriesIndex)
        return (
          <label
            borderColor={(checked) ? colors['light-6'] : transparentize(0.5, colors['light-6'])}
            htmlFor={label}
            key={`${label}-${seriesIndex}`}
          >
            <input
              checked={checked}
              id={label}
              name='series-phase-focus'
              onChange={event => { setSeriesPhaseFocus(event) }}
              type='radio'
              value={seriesIndex.toString()}
            />
            <svg viewBox='0 0 10 10' width='15px' style={{ paddingRight: '0.5ch' }}>
              <Glyph left={5} fill={color} size={20} top={5} />
            </svg>
            <SpacedText
              color={(checked) ? 'black' : 'rbga(0,0,0,0.5)'}
              style={{ fontSize: '0.5em', whiteSpace: 'nowrap' }} // TODO: update theme for smaller size of span text
              weight='bold'
            >
              {label}
            </SpacedText>
          </label>
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