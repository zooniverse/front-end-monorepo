import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { SpacedText } from '@zooniverse/react-components'
import getDataSeriesColor from '../../../../../../helpers/getDataSeriesColor'
import getDataSeriesSymbol from '../../../../../../helpers/getDataSeriesSymbol'

const StyledLabel = styled.span`
  align-items: center;
  cursor: pointer;
  display: inline-flex;
  flex-direction: row;
  padding: 2.5px;

  /* Could use Grommet gap prop instead */
  svg {
    padding: 0px 0.5ch;
  }

  /* Might remove this */
  &:hover, &:focus-within {
    background-color: rgba(216,216,216,0.4);
  }
`

function Label (props) {
  const { colors, label, seriesIndex, seriesOptions, visibleSeries } = props
  const Glyph = getDataSeriesSymbol(seriesIndex)
  const color = getDataSeriesColor({
    defaultColors: Object.values(colors.drawingTools),
    visibleSeries,
    seriesOptions,
    seriesIndex,
    themeColors: colors
  })

  return (
    <StyledLabel>
      <svg viewBox='0 0 10 10' width='15px'>
        <Glyph left={5} fill={color} size={20} top={5} />
      </svg>
      <SpacedText
        style={{ whiteSpace: 'nowrap' }}
        size='0.5em' // TODO: update theme for smaller size of span text
        weight='bold'
      >
        {label}
      </SpacedText>
    </StyledLabel>
  )
}

Label.propTypes = {
  colors: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  seriesIndex: PropTypes.number.isRequired,
  seriesOptions: PropTypes.object,
  visibleSeries: PropTypes.array
}

export default Label