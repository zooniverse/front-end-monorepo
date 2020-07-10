import React from 'react'
import PropTypes from 'prop-types'
import { Box } from 'grommet'
import styled, { css, withTheme } from 'styled-components'
import { transparentize } from 'polished'
import { SpacedText } from '@zooniverse/react-components'
import getDataSeriesColor from '../../../../../../helpers/getDataSeriesColor'
import getDataSeriesSymbol from '../../../../../../helpers/getDataSeriesSymbol'

export const StyledLabel = styled.label`
  align-items: center;
  ${props => css`
    border: solid thin ${props.borderColor};
  `}
  border-radius: 10px;
  cursor: pointer;
  display: inline-flex;
  flex-direction: row;
  padding: 2.5px 5px;

  input {
    opacity: 0.01;
    position: absolute;
  }

  &:hover, &:focus-within {
    background-color: rgba(216,216,216,0.4);
  }
`

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
    <Box direction='row' gap='xsmall' pad='none'>
      {visibleSeries.map((series, seriesIndex) => {
        const [[label, checked]] = Object.entries(series)
        const seriesOptions = data[seriesIndex]?.seriesOptions
        const color = getDataSeriesColor({
          defaultColors: Object.values(colors.drawingTools),
          visibleSeries,
          seriesOptions: seriesOptions,
          seriesIndex,
          themeColors: colors
        })
        const Glyph = getDataSeriesSymbol(seriesIndex)
        return (
          <StyledLabel
            borderColor={(checked) ? colors['light-6'] : transparentize(0.5, colors['light-6'])}
            htmlFor={label}
            key={`${label}-${seriesIndex}`}
          >
            <input
              checked={checked}
              id={label}
              name='series-focus'
              onChange={event => { setSeriesVisibility(event) }}
              type='checkbox'
              value={label}
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
          </StyledLabel>
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