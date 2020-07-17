import React from 'react'
import PropTypes from 'prop-types'
import { Box } from 'grommet'
import styled from 'styled-components'
import { PlainButton, SpacedText, withThemeContext } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import FlipIcon from '../FlipIcon'
import en from '../../locales/en'
import theme from './theme'
import VisibilitySeriesCheckBoxes from './components/VisibilitySeriesCheckBoxes'
import PhaseFocusControls from './components/PhaseFocusControls'
import PeriodMultipleControls from './components/PeriodMultipleControls'

counterpart.registerTranslations('en', en)

export const FlipButton = styled(PlainButton)`
  &:enabled:hover, &:focus {
    text-decoration: none;

    > div > svg > circle {
      fill: rgba(216,216,216,0.4);
    }
  }

  > div {
    flex-direction: column;
  }
`


function Controls(props) {
  const {
    data,
    gridArea,
    periodMultiple,
    periodMultipleOptions,
    phaseFocusedSeries,
    setSeriesVisibility,
    setSeriesPhaseFocus,
    setPeriodMultiple,
    setYAxisInversion,
    visibleSeries
  } = props

  const radioButtonOptions = periodMultipleOptions.map((option) => {
    return {
      label: <SpacedText size='10px' style={{ width: '1ch' }} weight='bold'>{option}</SpacedText>,
      value: option
    }
  })

  return (
    <Box
      background='neutral-6'
      direction='row'
      justify='between'
      gridArea={gridArea}
      pad='xsmall'
    >
      <SpacedText
        style={{ fontSize: '0.5em', textAlign: 'center', transform: 'rotate(180deg)', writingMode: 'vertical-lr' }}
      >
        {counterpart('VariableStarViewer.controls')}
      </SpacedText>
      <FlipButton
        icon={<FlipIcon />}
        label={
          <SpacedText margin={{ top: '5px' }} size='10px' weight='bold'>
            {counterpart('VariableStarViewer.flip')}
          </SpacedText>
        }
        onClick={event => setYAxisInversion(event)}
        pad='small'
      />
      <PeriodMultipleControls
        options={radioButtonOptions}
        periodMultiple={periodMultiple}
        setPeriodMultiple={setPeriodMultiple}
      />
      <Box justify='between'>
        <PhaseFocusControls
          data={data}
          phaseFocusedSeries={phaseFocusedSeries}
          setSeriesPhaseFocus={setSeriesPhaseFocus}
        />
        <SpacedText size='10px' weight='bold'>
          {counterpart('VariableStarViewer.phaseFocus')}
        </SpacedText>
      </Box>
      <Box justify='between'>
        <VisibilitySeriesCheckBoxes
          data={data}
          visibleSeries={visibleSeries}
          setSeriesVisibility={setSeriesVisibility}
        />
        <SpacedText size='10px' weight='bold'>
          {counterpart('VariableStarViewer.visibility')}
        </SpacedText>
      </Box>
    </Box>
  )
}

Controls.defaultProps = {
  data: [],
  gridArea: '',
  periodMultiple: 1,
  periodMultipleOptions: ['0.5', '1', '2', '3'],
  phaseFocusedSeries: 0,
  setSeriesVisibility: () => {},
  setPeriodMultiple: () => {},
  setYAxisInversion: () => {},
  visibleSeries: []
}

Controls.propTypes = {
  data: PropTypes.array,
  gridArea: PropTypes.string,
  periodMultiple: PropTypes.number,
  periodMultipleOptions: PropTypes.arrayOf(PropTypes.string),
  phaseFocusedSeries: PropTypes.number,
  setSeriesVisibility: PropTypes.func,
  setPeriodMultiple: PropTypes.func,
  setYAxisInversion: PropTypes.func,
  visibleSeries: PropTypes.arrayOf(PropTypes.object)
}

export default withThemeContext(Controls, theme)